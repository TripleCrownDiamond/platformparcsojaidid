const baseUrl = "https://efficient-apparel-56013b6060.strapiapp.com";

export const getUserData = async (userId) => {
  if (!userId) return null;

  try {
    const response = await fetch(
      `${baseUrl}/api/clerk-users?filters[slug][$eq]=${userId}`
    );
    const data = await response.json();

    if (data && data.data && data.data.length > 0) {
      return data.data[0];
    } else {
      console.log("Aucune donnée trouvée pour cet utilisateur.");
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    return null;
  }
};

export const updateUserData = async (userId, updatedData) => {
  try {
    const response = await fetch(`${baseUrl}/api/clerk-users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: updatedData // Ceci devrait bien correspondre à la structure attendue par Strapi
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour des données.');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
    throw new Error('Erreur lors de la mise à jour des données.');
  }
};
