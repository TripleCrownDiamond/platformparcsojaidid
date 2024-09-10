"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { FaTimes } from "react-icons/fa";
import { getUserData, updateUserData } from "@/app/api/getUserDatas";
import { toast } from "react-toastify";

interface CompleteProfileProps {
  setOpenCompleteProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const CompleteProfile: React.FC<CompleteProfileProps> = ({
  setOpenCompleteProfile,
}) => {
  const { user } = useUser();
  const [userData, setUserData] = useState<any>(null);
  const [selectedSex, setSelectedSex] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [selectedProfession, setSelectedProfession] = useState<string>("");
  const [organizationName, setOrganizationName] = useState<string>("");

  const professions = [
    "Agriculteur",
    "Ingénieur agronome",
    "Technicien agricole",
    "Consultant",
    "Entrepreneur",
    "Transformateur",
    "Commerçant",
    "Autre",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData(user?.id);
      setUserData(data);
      setSelectedSex(data.attributes?.sex || "");
      setBirthdate(data.attributes?.birthdate || "");
      setSelectedProfession(data.attributes?.profession || "");
      setOrganizationName(data.attributes?.organization_name || "");
    };

    fetchData();
  }, [user?.id]);

  const handleClose = () => {
    setOpenCompleteProfile(false);
  };

  const handleSexChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSex(e.target.value);
  };

  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthdate(e.target.value);
  };

  const handleProfessionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProfession(e.target.value);
  };

  const handleOrganizationNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOrganizationName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateUserData(userData.id, {
        sex: selectedSex,
        birthdate,
        profession: selectedProfession,
        organization_name: organizationName,
      });

      // Réinitialiser les champs après une mise à jour réussie
      setSelectedSex("");
      setBirthdate("");
      setSelectedProfession("");
      setOrganizationName("");

      const updatedData = await getUserData(user?.id);
      setUserData(updatedData);

      toast.success("Les informations ont été mises à jour avec succès !");
    } catch (error) {
      toast.error("Une erreur est survenue lors de la mise à jour.");
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
              <label htmlFor="birthdate">Date de naissance</label>
              <small>
                Valeur actuelle:{" "}
                <span className="font-bold">
                  {userData.attributes?.birthdate
                    ? userData.attributes?.birthdate
                    : "Non spécifiée"}
                </span>
              </small>
              <input
                type="date"
                id="birthdate"
                value={birthdate}
                onChange={handleBirthdateChange}
                className="mt-2 p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-5 w-full h-auto">
            <div className="w-full md:w-[50%] flex flex-col">
              <label htmlFor="profession">Profession</label>
              <small>
                Valeur actuelle:{" "}
                <span className="font-bold">
                  {userData.attributes?.profession
                    ? userData.attributes?.profession
                    : "Non spécifiée"}
                </span>
              </small>
              <select
                name="profession"
                id="profession"
                value={selectedProfession}
                onChange={handleProfessionChange}
                className="mt-2 p-2 border border-gray-300 rounded-md"
              >
                <option value="">-- Sélectionnez --</option>
                {professions.map((profession) => (
                  <option key={profession} value={profession}>
                    {profession}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full md:w-[50%] flex flex-col">
              <label htmlFor="organization_name">
                Nom de l&apos;organisation
              </label>
              <small>
                Valeur actuelle:{" "}
                <span className="font-bold">
                  {userData.attributes?.organization_name
                    ? userData.attributes?.organization_name
                    : "Non spécifiée"}
                </span>
              </small>
              <input
                type="text"
                id="organization_name"
                value={organizationName}
                onChange={handleOrganizationNameChange}
                className="mt-2 p-2 border border-gray-300 rounded-md"
              />
            </div>
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
