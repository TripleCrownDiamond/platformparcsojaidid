import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { getHeroAboutCtaDatas } from "@/app/api/getHeroAboutCtaDatas";

export default async function Cta() {
  const { userId } = auth();
  const { data } = await getHeroAboutCtaDatas("/api/cta-section?populate=*");

  // Valeurs par défaut
  const defaultTitle =
    "Optimisez vos pratiques agricoles. Découvrez des ressources éducatives illimitées.";
  const defaultDescription =
    "Accédez à des guides complets, des études de cas et des formations spécifiques sur la culture du soja. Transformez votre manière de cultiver et maximisez vos rendements grâce à nos outils et ressources adaptés aux défis modernes de l’agriculture.";
  const defaultImageUrl = "/img/black-farmer.png";
  const defaultCtaText = "Commencez maintenant";

  // Utilisation des valeurs par défaut si les données ne sont pas disponibles
  const {
    title = defaultTitle,
    description = defaultDescription,
    cta_text = defaultCtaText,
    imageUrl = defaultImageUrl,
  } = data || {};

  return (
    <div className="bg-green-100 py-20">
      <div className="w-full bg-opacity-80 rounded-2xl px-12 md:px-64 flex flex-col justify-start items- md:justify-center md:items-center">
        <div>
          <Image
            className="w-[150px] h-[150px] md:w-[250px] md:h-[250px]"
            src={imageUrl}
            alt="black-farmer"
            width={250}
            height={250}
          />
        </div>

        <h2 className="text-2xl text-left md:text-center sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-green-800 mb-4">
          {title}
        </h2>
        <p className="mt-2 text-sm md:text-base text-gray-800 text-left md:text-center">
          {description}
        </p>
        <div className="mt-8 flex flex-col items-start md:items-center gap-4">
          <Link
            href={userId ? "./dashboard" : "./sign-in"}
            className="rounded-md bg-green-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 transition duration-300"
          >
            {cta_text}
          </Link>
        </div>
      </div>
    </div>
  );
}
