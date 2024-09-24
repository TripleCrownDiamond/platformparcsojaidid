import { baseUrl } from "@/constants";;

/**
 * Récupère les données de l'API.
 * @param {string} path - Chemin de l'API à appeler.
 * @returns {Promise<{ loading: boolean, data: Data|null }>} - Les données de l'API ou null en cas d'erreur.
 */

export async function getTestimonialsDatas(path) {
  try {
    const response = await fetch(baseUrl + path);
    const data = await response.json();

    // Vérifiez que les données existent et sont bien un tableau
    if (!data || !data.data || !Array.isArray(data.data)) {
      return {
        loading: true,
        data: null,
      };
    }

    // Traitez chaque élément du tableau
    const testimonials = data.data.map((item) => {
      const { name, title, message, image } = item.attributes;
      return { name, title, message, image };
    });

    return {
      loading: false,
      data: testimonials,
    };

  } catch (error) {
    console.error(error);
    return {
      loading: true,
      data: null,
    };
  }
}
