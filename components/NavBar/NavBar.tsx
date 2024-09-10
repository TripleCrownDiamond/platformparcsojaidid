import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const navigation = [
  { name: "Accueil", href: "./", current: true },
  { name: "A-propos", href: "./#about", current: true },
  { name: "Contact", href: "./#contact", current: false },
];

export default function NavBar() {

  const { userId } = auth();

  return (
    <Disclosure as="nav" className="bg-gray-100 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Bouton menu mobile */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Ouvrir le menu principal</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link href="./">
                <h1 className="text-base font-black">LOGO</h1>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
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
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <SignedOut>
              <Link href="/sign-in">
                <button className="rounded-md bg-green-800 px-3 py-2 text-sm font-medium text-white hover:bg-green-600">
                  Se connecter
                </button>
              </Link>
            </SignedOut>

            <SignedIn>
              {/* Dropdown Profil */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-gray-100">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Ouvrir le menu utilisateur</span>
                    <UserButton afterSignOutUrl="/" />
                  </MenuButton>
                </div>
              </Menu>
            </SignedIn>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-200 hover:text-gray-900"
            >
              {item.name}
            </DisclosureButton>
          ))}
          {/* Lien "Ressources" dans le menu mobile */}
          <DisclosureButton
            as="a"
            href={userId ? "/dashboard" : "/sign-in"}
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-200 hover:text-gray-900"
          >
            Ressources
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
