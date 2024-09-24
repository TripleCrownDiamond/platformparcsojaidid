import Image from "next/image";
import Link from "next/link";
import { getHeroAboutCtaDatas } from "@/app/api/getHeroAboutCtaDatas";
import { userId } from "@/constants";

/**
 * Composant Hero.
 * @returns {JSX.Element} - Composant Hero avec les données de l'API.
 */
const Hero = async () => {
  
  // Valeurs par défaut
  const defaultTitle =
    "Explorez des Ressources Inestimables pour la culture du Soja.";
  const defaultDescription =
    "Accédez à une bibliothèque riche en ressources sur la culture du soja. Trouvez des fiches techniques, des guides pratiques et des formations spécialisées pour améliorer vos pratiques agricoles et optimiser vos rendements, que vous soyez agriculteur, technicien ou passionné.";
  const defaultCtaText = "Accéder aux Ressources";
  const defaultImageUrl = "/img/soja-plant.png";

  // Récupération des données
  const { data } = await getHeroAboutCtaDatas("/api/hero-section?populate=*");

  // Utilisation des valeurs par défaut si les données ne sont pas disponibles
  const {
    title = defaultTitle,
    description = defaultDescription,
    cta_text = defaultCtaText,
    imageUrl = defaultImageUrl,
  } = data || {};

  return (
    <div className="w-full py-20 px-6 md:px-[60px] lg:px-[120px] bg-gradient-to-r from-green-700 to-green-300 flex flex-col md:flex-row items-center">
      <div className="w-full md:w-[65%] px-4 md:px-10 mb-8 md:mb-0">
        <h1 className="text-white font-black text-2xl md:text-4xl lg:text-5xl mb-4">
          {title}
        </h1>
        <p className="text-white text-xs md:text-sm lg:text-base mb-8 text-justify">
          {description}
        </p>
        <Link
          href={userId ? "/dashboard" : "/sign-in"}
          className="bg-green-900 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md font-semibold text-sm sm:text-base md:text-lg hover:bg-green-600 transition duration-300"
        >
          {cta_text}
        </Link>
      </div>
      <div className="w-full md:w-[35%] px-4 md:px-10 flex justify-center">
        <Image
          className=""
          src={imageUrl}
          alt="Image"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
};

export default Hero;
