import { baseUrl } from '@/constants';
import { getImageUrl } from '@/constants/index';


/**
 * @typedef {Object} ImageAttributes
 * @property {Object} formats
 * @property {Object} formats.large
 * @property {string} formats.large.url
 * @property {Object} data
 * @property {ImageAttributes} data.attributes
 */

/**
 * @typedef {Object} Data
 * @property {string} title
 * @property {string} description
 * @property {string} cta_text
 * @property {ImageAttributes} image
 * @property {string} imageUrl
 */

/**
 * Récupère les données de l'API.
 * @param {string} path - Chemin de l'API à appeler.
 * @returns {Promise<{ loading: boolean, data: Data|null }>} - Les données de l'API ou null en cas d'erreur.
 */

export async function getHeroAboutCtaDatas(path) {
  try {
    const response = await fetch(baseUrl + path);
    const data = await response.json();

    // Vérifiez que les données et leurs attributs sont définis
    if (!data || !data.data || !data.data.attributes) {
      return { 
        loading: true, 
        data: null 
      };
    }

    const { title, description, cta_text, image } = data.data.attributes;

    
    const imageUrl = getImageUrl(image);

    return { 
      loading: false, 
      data: {
        title,
        description,
        cta_text,
        imageUrl
      }
    };
  } catch (error) {
    console.error(error);
    return { 
      loading: true, 
      data: null 
    };
  }
}
