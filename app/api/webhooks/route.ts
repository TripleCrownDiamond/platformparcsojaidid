import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { baseUrl } from "@/constants";

interface UserJSON {
  id: string;
  email_addresses: Array<{ email_address: string }>;
  first_name: string | null;
  last_name: string | null;
  profile_image_url?: string;
}

export async function POST(req: Request) {
  console.log("Webhook received");
  
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  
  if (!WEBHOOK_SECRET) {
    console.error("WEBHOOK_SECRET is not set");
    throw new Error("Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  console.log("Headers received:", {
    svix_id,
    svix_timestamp,
    svix_signature
  });

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing svix headers");
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  console.log("Payload received:", body);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;

    console.log("Webhook verification succeeded:", evt);
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  // Vérifiez si l'événement est lié à un utilisateur via son type d'événement
  if (evt.type === "user.created" || evt.type === "user.updated") {
    const userData = evt.data as UserJSON;

    const extractedData = {
      data: {
        slug: userData.id,
        email: userData.email_addresses[0]?.email_address || "",
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        profile_image_url: userData.profile_image_url || "",
      },
    };

    console.log("Extracted user data:", extractedData);

    // Envoyer les données à l'API externe
    try {
      console.log("Sending data to external API...");
      const response = await fetch(
        "https://smart-baseball-ed4db8eac7.strapiapp.com/api/clerk-users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(extractedData),
        }
      );

      const responseData = await response.json();
      
      console.log("Response from external API:", responseData);

      return new Response("", { status: 200 });
    } catch (error) {
      console.error("Error sending data to external API:", error);
      return new Response("Error occurred while sending data", { status: 500 });
    }
  } else {
    console.log("Event type not related to user creation or update:", evt.type);
    return new Response("Event is not related to user creation or update", { status: 400 });
  }
}
