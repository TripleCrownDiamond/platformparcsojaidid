import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getHeroAndAboutDatas } from "@/api/getHeroAndAboutDatas";
import { userId } from "@/constants/";

const About = async () => {

  const { loading, data } = await getHeroAndAboutDatas("/api/about-section?populate=*");

  console.log(data)

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">Chargement...</div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center p-10">Erreur de données</div>
    );
  }

  const { title, description, cta_text, imageUrl } = data;

  return (
    <div
      id="about"
      className="w-full mt-14 flex flex-col md:flex-row justify-center items-center p-5 gap-10"
    >
      <div className="w-full md:w-[35%]">
        {imageUrl ? (
          <Image
            className=""
            src={imageUrl}
            alt="Image"
            width={1000}
            height={1000}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-white">Image non trouvée</p>
          </div>
        )}
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
