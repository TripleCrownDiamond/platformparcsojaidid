// utils/userService.ts
export const getUserId = async () => {
    const isServer = typeof window === "undefined";
    const baseUrl = isServer
      ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      : "";
  
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
  