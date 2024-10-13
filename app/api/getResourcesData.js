const baseUrl = "https://smart-baseball-ed4db8eac7.strapiapp.com";

// Fonction pour récupérer une ressource par ID
export const getResourceById = async (resourceId) => {
  try {
    const response = await fetch(`${baseUrl}/resources/${resourceId}?populate=*`, {
      next: { revalidate: 10 }, // Ajout de la configuration pour éviter le problème de composant côté serveur
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération de la ressource.");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Erreur:", error);
    throw error;
  }
};

// Fonction pour récupérer toutes les ressources
export const fetchAllResources = async () => {
  try {
    const response = await fetch(`${baseUrl}/resources?populate=*&sort=createdAt:asc`, {
      next: { revalidate: 10 }, // Ajout de la configuration pour éviter le problème de composant côté serveur
    });    

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des ressources.");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Erreur:", error);
    throw error;
  }
};
