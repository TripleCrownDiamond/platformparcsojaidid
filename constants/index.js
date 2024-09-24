import { auth } from "@clerk/nextjs/server";
import imageFormats from "./imageFormats";

export const baseUrl = "https://efficient-apparel-56013b6060.strapiapp.com";
export  const { userId } = auth();

// Fonction pour obtenir l'URL de l'image selon les formats disponibles
export const getImageUrl = (image) => {
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
