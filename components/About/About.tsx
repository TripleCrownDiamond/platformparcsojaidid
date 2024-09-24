import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getHeroAboutCtaDatas } from "@/app/api/getHeroAboutCtaDatas";
import { userId } from "@/constants/";

const About = async () => {
  const { data } = await getHeroAboutCtaDatas("/api/about-section?populate=*");

  // Valeurs par défaut
  const defaultTitle = "A-propos de cette plateforme";
  const defaultDescription =
    "Cette plateforme de ressources éducatives pour le soja est conçue pour fournir aux agriculteurs des informations clés sur la culture du soja, allant des bonnes pratiques aux techniques avancées. Le partenariat de niveau 2 (N2) implique une collaboration avec des organisations locales, des instituts de recherche et des ONG, qui contribuent à fournir des ressources adaptées et à partager leur expertise pour soutenir les agriculteurs dans l'amélioration de leurs pratiques.";
  const defaultImageUrl = "/img/laptop.png";
  const defaultCtaText = "Commencez maintenant";

  // Utilisation des valeurs par défaut si les données ne sont pas disponibles
  const {
    title = defaultTitle,
    description = defaultDescription,
    cta_text = defaultCtaText,
    imageUrl = defaultImageUrl,
  } = data || {};

  return (
    <div
      id="about"
      className="w-full mt-14 flex flex-col md:flex-row justify-center items-center p-5 gap-10"
    >
      <div className="w-full md:w-[35%]">
        <Image
          className=""
          src={defaultImageUrl}
          alt="Image"
          width={1000}
          height={1000}
        />
      </div>
      <div className="w-full md:w-[35%] flex flex-col justify-start items-start">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-green-900 sm:text-4xl">
          {title}
        </h1>
        <p className="text-sm md:text-base font-normal mb-10 mt-6">
          {description}
        </p>
        <Link
          href={userId ? "./dashboard" : "./sign-in"}
          className="rounded-md bg-green-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 transition duration-300"
        >
          {cta_text}
        </Link>
      </div>
    </div>
  );
};

export default About;
