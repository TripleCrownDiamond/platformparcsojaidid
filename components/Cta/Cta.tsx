import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

export default function Cta() {
  const { userId } = auth();

  return (
    <div className="bg-green-100 py-20">
      <div className="w-full bg-opacity-80 rounded-2xl px-12 md:px-64 flex flex-col justify-start items- md:justify-center md:items-center">
        <div>
          <Image
            className="w-[150px] h-[150px] md:w-[250px] md:h-[250px]"
            src="/img/black-farmer.png"
            alt="black-farmer"
            width={250}
            height={250}
          />
        </div>

        <h2 className="text-2xl text-left md:text-center sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-green-800 mb-4">
          Optimisez vos pratiques agricoles. Découvrez des ressources éducatives
          illimitées.
        </h2>
        <p className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 text-left md:text-center">
          Accédez à des guides complets, des études de cas et des formations
          spécifiques sur la culture du soja. Transformez votre manière de
          cultiver et maximisez vos rendements grâce à nos outils et ressources
          adaptés aux défis modernes de l’agriculture.
        </p>
        <div className="mt-8 flex flex-col items-start md:items-center gap-4">
          <Link
            href={userId ? "./dashboard" : "./sign-in"}
            className="rounded-md bg-green-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 transition duration-300"
          >
            Commencez maintenant
          </Link>
          <Link
            href="./about"
            className="text-sm font-semibold leading-6 text-green-800 hover:underline"
          >
            En savoir plus <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
