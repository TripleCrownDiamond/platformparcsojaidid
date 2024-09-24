import { baseUrl } from "@/constants";
/**
 * @typedef {Object} Data
 * @property {string} title
 * @property {string} subtitle_1
 * @property {string} subtitle_2
 * @property {string} description
 * @property {string} icon
 */

/**
 * Récupère les données de l'API.
 * @param {string} path - Chemin de l'API à appeler.
 * @returns {Promise<{ loading: boolean, stepLoading: boolean, data: Data|null, stepData: Data|null }>} - Les données de l'API ou null en cas d'erreur.
 */

export async function getFeaturesHeaderDatas(path) {
  try {
    const response = await fetch(baseUrl + path);
    const data = await response.json();

    // Vérifiez que les données et leurs attributs sont définis
    if (!data || !data.data || !data.data.attributes) {
      return {
        loading: true,
        data: null,
      };
    }

    const { title, subtitle_1, subtitle_2 } = data.data.attributes;

    return {
      loading: false,
      data: {
        title,
        subtitle_1,
        subtitle_2,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      loading: true,
      data: null,
    };
  }
}

export async function getFeaturesStepsDatas(path) {
  try {
    const response = await fetch(baseUrl + path);
    const stepData = await response.json();

    // Vérifiez que les données existent et sont bien un tableau
    if (!stepData || !stepData.data || !Array.isArray(stepData.data)) {
      
      return {
        stepLoading: true,
        stepData: null,
      };
    }

    // Traitez chaque élément du tableau
    const steps = stepData.data.map((item) => {
      const { title, description, icon } = item.attributes;
      return { title, description, icon };
    });

    return {
      stepLoading: false,
      stepData: steps,
    };
  } catch (error) {
    console.error(error);
    return {
      stepLoading: true,
      stepData: null,
    };
  }
}
