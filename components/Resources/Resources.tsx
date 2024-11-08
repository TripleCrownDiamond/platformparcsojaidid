import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { FaTimes } from "react-icons/fa";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
import Image from "next/image";
import { Resource, ApiResponse } from "@/constants/type";
import { getUserData } from "@/app/api/getUserDatas";

dayjs.extend(relativeTime);
dayjs.locale("fr");

interface UserData {
  id: string;
  attributes: {
    sex?: "male" | "female";
    commune?: string;
    arrondissement?: string;
    village?: string;
    animateur?: string;
    active?: boolean;
  };
}

interface ResourcesProps {
  setOpenResources: React.Dispatch<React.SetStateAction<boolean>>;
}

const Resources: React.FC<ResourcesProps> = ({ setOpenResources }) => {
  const { user } = useUser();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [resourcesData, setResourcesData] = useState<Resource[]>([]);
  const [displayedData, setDisplayedData] = useState<Resource[]>([]);
  const [loadingResources, setLoadingResources] = useState<boolean>(true);
  const [errorResources, setErrorResources] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [resourcesPerPage] = useState<number>(8);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        const data = await getUserData(user.id);
        setUserData(data);
        console.log("Contenu de userData:", data.attributes?.active);
      }
    };

    fetchData();
  }, [user?.id]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoadingResources(true);
        const response = await fetch(
          "https://smart-baseball-ed4db8eac7.strapiapp.com/api/resources?populate=*&sort=createdAt:desc"
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des ressources.");
        }

        const data: ApiResponse = await response.json();
        setResourcesData(data.data);
        setDisplayedData(
          data.data.slice(
            (page - 1) * resourcesPerPage,
            page * resourcesPerPage
          )
        );
      } catch (error) {
        console.error("Erreur lors du chargement des ressources:", error);
        setErrorResources(
          "Une erreur est survenue lors du chargement des ressources."
        );
      } finally {
        setLoadingResources(false);
      }
    };

    fetchResources();

    const interval = setInterval(() => {
      fetchResources();
    }, 30000);

    return () => clearInterval(interval);
  }, [page, resourcesPerPage]);

  useEffect(() => {
    setDisplayedData(
      resourcesData.slice(
        (page - 1) * resourcesPerPage,
        page * resourcesPerPage
      )
    );
  }, [resourcesData, page, resourcesPerPage]);

  const handleClose = () => {
    setOpenResources(false);
  };

  const handleNextPage = () => {
    if (
      (page - 1) * resourcesPerPage + resourcesPerPage < resourcesData.length
    ) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="w-full py-5 flex flex-col relative mb-96 bg-white">
      <button
        onClick={handleClose}
        className="absolute top-0 right-0 p-2 text-red-500 hover:text-red-700"
      >
        <FaTimes size={20} />
      </button>
      <h2 className="font-semibold text-xl md:text-2xl mb-4">Ressources</h2>

      {loadingResources && <p className="text-gray-700">Chargement des ressources...</p>}
      {errorResources && <p className="text-red-500">{errorResources}</p>}

      <div className="flex flex-col flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-20">
          {displayedData.map((resource) => {
            const formats = resource.attributes.image?.data?.attributes.formats;
            const imageUrl =
              formats?.large?.url ||
              formats?.medium?.url ||
              formats?.small?.url ||
              formats?.thumbnail?.url ||
              resource.attributes.image?.data?.attributes.url;

            return (
              <div
                key={resource.id}
                className="bg-gray-100 p-6 rounded-lg flex flex-col justify-between items-start shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <Image
                  src={imageUrl ? `${imageUrl}` : "/img/placeholder.webp"}
                  alt={resource.attributes.title}
                  className="w-full h-48 object-cover rounded-md"
                  width={500}
                  height={500}
                />
                <h3 className="text-lg font-semibold mt-2" title={resource.attributes.title}>
                  {resource.attributes.title.length > 100
                    ? `${resource.attributes.title.slice(0, 100)}...`
                    : resource.attributes.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {dayjs(resource.attributes.createdAt).fromNow()}
                </p>
                <a
                  href={`/resource/${resource.id}`}
                  className="text-blue-500 mt-4 hover:underline"
                >
                  Voir la ressource
                </a>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="bg-green-800 px-4 py-2 rounded-lg text-gray-100 hover:bg-green-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          Précédent
        </button>
        <button
          onClick={handleNextPage}
          disabled={
            (page - 1) * resourcesPerPage + resourcesPerPage >=
            resourcesData.length
          }
          className="bg-green-800 px-4 py-2 rounded-lg text-gray-100 hover:bg-green-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Resources;
