"use client";

import React, { useState, useEffect } from "react";
import { Resource } from "@/constants/type";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
import Image from "next/image";

dayjs.extend(relativeTime);
dayjs.locale("fr");

interface ResourceDetailsProps {
  resourceId: string;
}

const ResourceDetails: React.FC<ResourceDetailsProps> = ({ resourceId }) => {
  const baseUrl = 'https://efficient-apparel-56013b6060.strapiapp.com'; // Base URL for your files
  const [resourceData, setResourceData] = useState<Resource | null>(null);
  const [loadingResource, setLoadingResource] = useState<boolean>(true);
  const [errorResource, setErrorResource] = useState<string | null>(null);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        setLoadingResource(true);

        const response = await fetch(
          `https://efficient-apparel-56013b6060.strapiapp.com/api/resources/${resourceId}?populate=*`
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération de la ressource.");
        }

        const data = await response.json();
        console.log(data);

        setResourceData(data.data);
      } catch (error) {
        console.error("Erreur lors du chargement de la ressource :", error);
        setErrorResource(
          "Une erreur est survenue lors du chargement de la ressource."
        );
      } finally {
        setLoadingResource(false);
      }
    };

    fetchResource();
  }, [resourceId]);

  return (
    <div className="w-full py-5 px-4 md:px-10 lg:px-[130px] flex flex-col relative mb-96 bg-white">
      <h2 className="font-semibold text-xl md:text-2xl mb-4">
        Détails de la Ressource
      </h2>

      {loadingResource && <p>Chargement de la ressource...</p>}
      {errorResource && <p className="text-red-500">{errorResource}</p>}

      {resourceData && (
        <div className="relative">
          {/* Affichage de l'image en haut avec titre */}
          {resourceData.attributes.image?.data ? (
            <div className="relative mb-6">
              {(() => {
                const formats =
                  resourceData.attributes.image.data.attributes.formats;
                const imageUrl =
                  formats?.large?.url ||
                  formats?.medium?.url ||
                  formats?.small?.url ||
                  formats?.thumbnail?.url ||
                  resourceData.attributes.image.data.attributes.url;

                const originalWidth =
                  resourceData.attributes.image.data.attributes.width;
                const originalHeight =
                  resourceData.attributes.image.data.attributes.height;

                return (
                  <div className="relative">
                    <Image
                      src={
                        imageUrl
                          ? `${imageUrl}`
                          : "/img/placeholder.webp"
                      }
                      alt={
                        resourceData.attributes.image.data.attributes
                          .alternativeText || "Image"
                      }
                      width={originalWidth || 500}
                      height={originalHeight || 500}
                      className="w-full object-cover rounded-lg h-64 md:h-80"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl md:text-3xl font-black p-4">
                      <h1 className="truncate">
                        {resourceData.attributes.title.slice(0, 100)}
                      </h1>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="relative mb-6">
              <Image
                src="/img/placeholder.webp"
                alt="Placeholder Image"
                width={500}
                height={500}
                className="w-full object-cover rounded-md h-64 md:h-80"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-bold p-4">
                <h1 className="truncate">
                  {resourceData.attributes.title.slice(0, 100)}
                </h1>
              </div>
            </div>
          )}

          <div className="text-xl md:text-3xl font-black p-4">
            <h1 className="font-bold text-xl">
              Titre: {resourceData.attributes.title}
            </h1>
          </div>

          <div className="flex flex-col justify-start items-start p-6 w-full h-auto bg-green-50 mt-4 border-t border-gray-300">
            <h2 className="font-bold mb-2 text-xl">Description :</h2>
            <p className="mt-2 text-sm md:text-base">
              {resourceData.attributes.description}
            </p>
            <hr className="my-4 border-gray-300" />
            <p className="text-sm text-gray-500">
              Publié {dayjs(resourceData.attributes.createdAt).fromNow()}
            </p>
          </div>

          {/* Affichage d'une vidéo YouTube */}
          {resourceData.attributes.youtube_video && (
            <div className="youtube-video mt-6">
              <iframe
                width="560"
                height="315"
                src={resourceData.attributes.youtube_video.replace(
                  "watch?v=",
                  "embed/"
                )}
                title={resourceData.attributes.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {/* Affichage de fichiers */}
          {resourceData.attributes.files?.data?.length ? (
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">Fichiers :</h3>
              <ul>
                {resourceData.attributes.files.data.map((file) => (
                  <li key={file.id} className="mt-1">
                    <a
                      href={`${baseUrl}${file.attributes.url}`} // Construct the full URL
                      download
                      className="text-blue-500 underline"
                    >
                      {file.attributes.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Aucun fichier disponible.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ResourceDetails;