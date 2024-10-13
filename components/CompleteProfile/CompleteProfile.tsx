"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { FaTimes } from "react-icons/fa";
import { getUserData, updateUserData } from "@/app/api/getUserDatas";
import { toast } from "react-toastify";

// Type pour les données utilisateur
interface UserData {
  id: string;
  attributes: {
    sex?: "male" | "female";
    commune?: string;
    arrondissement?: string;
    village?: string;
    animateur?: string;
  };
}

interface CompleteProfileProps {
  setOpenCompleteProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const CompleteProfile: React.FC<CompleteProfileProps> = ({
  setOpenCompleteProfile,
}) => {
  const { user } = useUser();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedSex, setSelectedSex] = useState<string>("");
  const [commune, setCommune] = useState<string>("");
  const [arrondissement, setArrondissement] = useState<string>("");
  const [village, setVillage] = useState<string>("");
  const [animateur, setAnimateur] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        const data = await getUserData(user.id);
        setUserData(data);
        setSelectedSex(data.attributes?.sex || "");
        setCommune(data.attributes?.commune || "");
        setArrondissement(data.attributes?.arrondissement || "");
        setVillage(data.attributes?.village || "");
        setAnimateur(data.attributes?.animateur || "");
      }
    };

    fetchData();
  }, [user?.id]);

  const handleClose = () => {
    setOpenCompleteProfile(false);
  };

  const handleSexChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSex(e.target.value);
  };
  const handleCommuneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommune(e.target.value);
  };
  const handleArrondissementChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setArrondissement(e.target.value);
  };
  const handleVillageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVillage(e.target.value);
  };
  const handleAnimateurChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnimateur(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userData?.id) {
      try {
        const updatedData = {
          sex: selectedSex,
          commune: commune,
          arrondissement: arrondissement,
          village: village,
          animateur: animateur,
        };

        console.log("Données envoyées :", updatedData);

        await updateUserData(userData.id, updatedData);

        toast.success("Les informations ont été mises à jour avec succès !");
      } catch (error) {
        toast.error("Une erreur est survenue lors de la mise à jour.");
      }
    }
  };

  return (
    <div className="w-full py-5 flex flex-col relative mb-96">
      <button
        onClick={handleClose}
        className="absolute top-0 right-0 p-2 text-red-500 hover:text-red-700"
      >
        <FaTimes size={20} />
      </button>
      <h2 className="font-normal text-xl md:text-2xl">
        Editer vos informations supplémentaires
      </h2>

      {userData ? (
        <form
          onSubmit={handleSubmit}
          className="w-full h-auto bg-gray-100 rounded-lg my-2 p-10"
        >
          <div className="flex flex-col md:flex-row gap-5 w-full h-auto">
            <div className="w-full md:w-[50%] flex flex-col">
              <label htmlFor="sex">Editer le sexe</label>
              <small>
                Valeur actuelle:{" "}
                <span className="font-bold">
                  {userData.attributes?.sex === "male"
                    ? "Masculin"
                    : userData.attributes?.sex === "female"
                    ? "Féminin"
                    : "Non spécifié"}
                </span>
              </small>
              <select
                name="sex"
                id="sex"
                value={selectedSex}
                onChange={handleSexChange}
                className="mt-2 p-2 border border-gray-300 rounded-md"
              >
                <option value="">-- Sélectionnez --</option>
                <option value="male">Masculin</option>
                <option value="female">Féminin</option>
              </select>
            </div>

            <div className="w-full md:w-[50%] flex flex-col">
              <label htmlFor="commune">Commune</label>
              <small>
                Valeur actuelle:{" "}
                <span className="font-bold">
                  {userData.attributes?.commune || "Non spécifiée"}
                </span>
              </small>
              <input
                type="text"
                id="commune"
                value={commune}
                onChange={handleCommuneChange}
                className="mt-2 p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5 w-full h-auto">
            <div className="w-full md:w-[50%] flex flex-col">
              <label htmlFor="arrondissement">Arrondissement</label>
              <small>
                Valeur actuelle:{" "}
                <span className="font-bold">
                  {userData.attributes?.arrondissement || "Non spécifié"}
                </span>
              </small>
              <input
                type="text"
                id="arrondissement"
                value={arrondissement}
                onChange={handleArrondissementChange}
                className="mt-2 p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="w-full md:w-[50%] flex flex-col">
              <label htmlFor="village">Village</label>
              <small>
                Valeur actuelle:{" "}
                <span className="font-bold">
                  {userData.attributes?.village || "Non spécifié"}
                </span>
              </small>
              <input
                type="text"
                id="village"
                value={village}
                onChange={handleVillageChange}
                className="mt-2 p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="w-full md:w-[50%] flex flex-col">
            <label htmlFor="animateur">Animateur</label>
            <small>
              Valeur actuelle:{" "}
              <span className="font-bold">
                {userData.attributes?.animateur || "Non spécifié"}
              </span>
            </small>
            <input
              type="text"
              id="animateur"
              value={animateur}
              onChange={handleAnimateurChange}
              className="mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="mt-5 bg-green-800 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
          >
            Enregistrer les modifications
          </button>
        </form>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
};

export default CompleteProfile;
