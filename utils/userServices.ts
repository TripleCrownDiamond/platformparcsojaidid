export const getUserId = async () => {
  const isServer = typeof window === "undefined";
  const baseUrl = isServer
    ? process.env.NEXT_PUBLIC_BASE_URL || "https://platformparcsojaidid.vercel.app"
    : window.location.origin; // Utilise window.location.origin côté client

  const response = await fetch(`${baseUrl}/api/routes/getUserId`, {
    method: "GET",
    credentials: "include",
  });

  if (response.ok) {
    const data = await response.json();
    return data.userId;
  }

  return null;
};
