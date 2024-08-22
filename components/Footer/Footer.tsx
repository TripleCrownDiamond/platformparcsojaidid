import React from "react";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

const Footer = () => {
  const navigation = [
    { name: "Accueil", href: "./", current: true },
    { name: "A-propos", href: "#about", current: true },
    { name: "Contact", href: "#contact", current: false },
  ];

  const userId = auth();

  return (
    <div className="w-full flex flex-col justify-center align-center pt-5 md:pt-10">
      <div className="flex flex-row justify-center items-center gap-2 mb-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            aria-current={item.current ? "page" : undefined}
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 hover:text-gray-900"
          >
            {item.name}
          </Link>
        ))}
        {/* Lien "Ressources" qui redirige en fonction de l'état de connexion */}
        <Link
          href={userId ? "/dashboard" : "/sign-in"}
          className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 hover:text-gray-900"
        >
          Ressources
        </Link>
      </div>
      <div className="flex flex-shrink-0 justify-center items-center">
        <Link href="./">
          <h1 className="text-base font-black">LOGO</h1>
        </Link>
      </div>
      <div className="flex justify-center items-center mt-4 p-2 bg-green-100">
        <small>© 2024 <Link href="https://ididong.org">IDID ONG/PARC SOJA</Link>. All rights reserved.</small>
      </div>
    </div>
  );
};

export default Footer;