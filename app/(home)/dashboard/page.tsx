"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

const Dashboard = () => {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    // Optionnel: Afficher un indicateur de chargement pendant la vérification de l'utilisateur
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div
          className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-green-600 rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-10 px-6 md:px-[60px] lg:px-[120px] flex flex-col md:flex-row items-center">
      <h1 className="text-2xl font-normal">
        Salut <span className="font-bold"> {user?.firstName}</span>, bienvenue
        sur votre tableau de bord...
      </h1>
    </div>
  );
};

export default Dashboard;
