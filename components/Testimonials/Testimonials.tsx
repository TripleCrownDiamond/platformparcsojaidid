import React from "react";
import Image from "next/image";
import { getTestimonialsDatas } from "@/app/api/getTestimonialsDatas";
import { getImageUrl } from "@/constants";

interface ImageFormats {
  url: string;
  width: number;
  height: number;
}

interface Testimonial {
  name: string;
  title: string;
  message: string;
  image: {
    data: {
      id: number;
      attributes: {
        name: string;
        formats: {
          thumbnails: ImageFormats;
          small: ImageFormats;
          medium: ImageFormats;
          large: ImageFormats;
        };
      };
    };
  };
}

const messages = async () => {
  const { loading, data } = await getTestimonialsDatas(
    "/api/testimonials?populate=*&sort=createdAt:desc&pagination[limit]=3"
  );

  // Données par défaut si aucune donnée n'est récupérée ou en cas de chargement
  const defaultTestimonials = [
    {
      name: "Edgard",
      message:
        "Grâce à cette plateforme, j'ai pu augmenter le rendement de ma production de soja de manière significative.",
      title: "Producteur de Soja",
    },
    {
      name: "Marie Paule",
      message:
        "En tant que transformatrice de soja, cette application m'a aidée à mieux comprendre la qualité des récoltes pour optimiser le processus de transformation.",
      title: "Transformatrice de Soja",
    },
    {
      name: "Pauline Yao",
      message:
        "Les techniques recommandées par cette plateforme m'ont aidée à améliorer la qualité de mon soja, ce qui a facilité la transformation en produits dérivés.",
      title: "Transformatrice de Soja",
    },
  ];

  // Utilisation des données de l'API ou des données par défaut
  const testimonials = loading || !data ? defaultTestimonials : data;

  // Fonction pour tronquer le témoignage à 150 caractères
  const truncatemessage = (text: string, maxLength: number): string => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="flex flex-col justify-center items-center my-20">
      <h1 className="text-2xl md:text-4xl font-black mb-6">
        Ils utilisent notre plateforme
      </h1>
      <div className="flex flex-wrap justify-center items-center gap-10">
        {testimonials.map((testimonial: Testimonial, index: number) => {
           const imageUrl = testimonial.image
           ? getImageUrl(testimonial.image)
           : "/img/user.png";
          return (
            <div
              key={index}
              className="flex flex-col h-96 items-center justify-center p-6 bg-green-100 rounded-lg shadow-md max-w-xs"
            >
              <Image
                src={imageUrl}
                alt="profile"
                className="w-24 h-24 rounded-full mb-4"
                width={100}
                height={100}
              />
              <h2 className="text-lg font-semibold">{testimonial.name}</h2>
              <p className="text-sm text-gray-600">{testimonial.title}</p>
              <p className="text-center mt-4 text-gray-800">
                {truncatemessage(testimonial.message, 150)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default messages;
