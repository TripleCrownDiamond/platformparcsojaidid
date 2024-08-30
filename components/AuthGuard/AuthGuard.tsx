"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"; // Assurez-vous de bien importer ce composant

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return children;
};

export default AuthGuard;
