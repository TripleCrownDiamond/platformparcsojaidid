import { baseUrl } from '@/constants';
import imageFormats from '@/constants/imageFormats';

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

export async function getHeroAndAboutDatas(path) {
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

    // Fonction pour obtenir l'URL de l'image selon les formats disponibles
    const getImageUrl = (image) => {
      if (!image || !image.data || !image.data.attributes || !image.data.attributes.formats) {
        return '';
      }

      const formats = image.data.attributes.formats;

      for (const format of imageFormats) {
        if (formats[format]) {
          return `${baseUrl}${formats[format].url}`;
        }
      }

      return '';
    };

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
