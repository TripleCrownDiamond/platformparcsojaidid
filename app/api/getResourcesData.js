// api.js

const API_BASE_URL = "http://localhost:1337/api";

// Fonction pour récupérer une ressource par ID
export const fetchResourceById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/resources/${id}?populate=*`);

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
    const response = await fetch(`${API_BASE_URL}/resources?populate=*&sort=createdAt:desc`);

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
