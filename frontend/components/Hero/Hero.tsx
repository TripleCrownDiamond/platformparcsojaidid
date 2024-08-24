import Image from 'next/image';
import Link from 'next/link';
import { getHeroAndAboutDatas } from '@/api/getHeroAndAboutDatas';
import { userId } from '@/constants';

/**
 * Composant Hero.
 * @returns {JSX.Element} - Composant Hero avec les données de l'API.
 */
const Hero = async () => {

  const { loading, data } = await getHeroAndAboutDatas('/api/hero-section?populate=*');

  if (loading) {
    return <div className="flex justify-center items-center p-10">Chargement...</div>;
  }

  if (!data) {
    return <div className="flex justify-center items-center p-10">Erreur de données</div>;
  }

  const { title, description, cta_text, imageUrl } = data;

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
    </div>
  );
};

export default Hero;
