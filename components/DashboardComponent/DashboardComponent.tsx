"use client";

import AuthGuard from "../AuthGuard/AuthGuard"; // Importez le composant AuthGuard
import { useUser } from "@clerk/nextjs";
import CompleteProfile from "../CompleteProfile/CompleteProfile";
import { FaUserEdit, FaBook } from "react-icons/fa"; // Importez les icônes
import { useState } from "react";

const DashboardComponent = () => {
  const [openCompleteProfile, setOpenCompleteProfile] = useState(false);
  const [openResources, setOpenResources] = useState(false);
  const { user } = useUser();

  // Fonction pour gérer le clic du bouton "Editer mon profil"
  const handleEditProfileClick = () => {
    setOpenCompleteProfile(true);
    setOpenResources(false); // Ferme la section des ressources si elle est ouverte
  };

  // Fonction pour gérer le clic du bouton "Afficher les ressources"
  const handleOpenResourcesClick = () => {
    setOpenResources(true);
    setOpenCompleteProfile(false); // Ferme la section de l'édition de profil si elle est ouverte
  };

  return (
    <AuthGuard>
      <div className="w-full h-screen py-10 px-6 md:px-[60px] lg:px-[120px] flex flex-col md:flex-row items-start">
        <div className="w-full flex flex-col justify-start items-start">
          <h1 className="text-2xl font-normal">
            Salut <span className="font-bold">{user?.firstName}</span>,
            bienvenue sur votre tableau de bord...
          </h1>
          <div className="w-full flex flex-col md:flex-row py-5 gap-5">
            <button
              onClick={handleEditProfileClick}
              disabled={openCompleteProfile} // Désactiver le bouton après le clic
              className={`flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium text-white rounded-md ${
                openCompleteProfile
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-800 hover:bg-green-600"
              }`}
            >
              <FaUserEdit className="mr-2" /> Editer vos informations supplémentaires
            </button>
            <button
              onClick={handleOpenResourcesClick}
              disabled={openResources} // Désactiver le bouton après le clic
              className={`flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium text-white rounded-md ${
                openResources
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-400"
              }`}
            >
              <FaBook className="mr-2" /> Afficher les ressources
            </button>
          </div>
          {openCompleteProfile && (
            <CompleteProfile setOpenCompleteProfile={setOpenCompleteProfile} />
          )}
          {openResources && (
            <div className="w-full py-5">
              <h2>Ressources</h2>
              {/* Affichez vos ressources ici */}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
};

export default DashboardComponent;
