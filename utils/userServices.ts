// utils/userService.ts
export const getUserId = async () => {
    const isServer = typeof window === "undefined";
    const baseUrl = isServer
      ? process.env.NEXT_PUBLIC_BASE_URL || "https://platformparcsojaidid-git-main-triplecrowndiamonds-projects.vercel.app/"
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
  