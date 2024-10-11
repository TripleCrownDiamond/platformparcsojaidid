import imageFormats from "./imageFormats";

export const baseUrl = "https://smart-baseball-ed4db8eac7.strapiapp.com";

// Fonction pour obtenir l'URL de l'image selon les formats disponibles
export const getImageUrl = (image) => {
    if (!image || !image.data || !image.data.attributes || !image.data.attributes.formats) {
      return '';
    }

    const formats = image.data.attributes.formats;

    for (const format of imageFormats) {
      if (formats[format]) {
        return `${formats[format].url}`;
      }
    }

    return '';
  };
