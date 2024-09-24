"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"; // Assurez-vous de bien importer ce composant

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
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

  return <>{children}</>;
};

export default AuthGuard;
