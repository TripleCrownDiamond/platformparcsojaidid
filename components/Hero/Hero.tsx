import React from "react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

const Hero = () => {

  const {userId} = auth();

  return (
    <div className="w-full py-20 px-6 md:px-[60px] lg:px-[120px] bg-gradient-to-r from-green-700 to-green-300 flex flex-col md:flex-row items-center">
      <div className="w-full md:w-[65%] px-4 md:px-10 mb-8 md:mb-0">
        <h1 className="text-white font-black text-2xl md:text-4xl lg:text-5xl mb-4">
          Explorez des Ressources Inestimables pour l'Agriculture
        </h1>
        <p className="text-white text-xs md:text-sm lg:text-base mb-8 text-justify">
          Accédez à une bibliothèque riche en ressources sur la culture du soja. Trouvez des fiches techniques, des guides pratiques et des formations spécialisées pour améliorer vos pratiques agricoles et optimiser vos rendements, que vous soyez agriculteur, technicien ou passionné.
        </p>
        <Link
          href={userId ? "/dashboard" : "/sign-in"}
          className="bg-green-900 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md font-semibold text-sm sm:text-base md:text-lg hover:bg-green-600 transition duration-300"
        >
          Accéder aux Ressources
        </Link>
      </div>
      <div className="w-full md:w-[35%] px-4 md:px-10 flex justify-center">
        <Image className="" src="/img/soja-plant.png" alt="Soja Plant" width={1000} height={1000} />
      </div>
    </div>
  );
};

export default Hero;
