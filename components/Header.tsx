import { Fragment, useContext } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  BookmarkSquareIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  LifebuoyIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { UserContext } from "./UserContext";

const solutions = [
  {
    name: "Formations",
    description: "Découvrer tous les formations de MOORIBEN.",
    href: "#",
    icon: ChartBarIcon,
  },
  {
    name: "Atéliers",
    description: "Parcourir les atéliers de MOORIBEN.",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Rapport Semestriel",
    description: "Voir tous les rapports semestrielle de MOORIBEN.",
    href: "#",
    icon: ShieldCheckIcon,
  },
  {
    name: "Récrutement",
    description: "Tous les annonces de récrutement.",
    href: "#",
    icon: Squares2X2Icon,
  },
  {
    name: "Rapport Annuel",
    description: "Parcourir les rapports annuels de MOORIBEN",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Agroécologie", href: "#", icon: PlayIcon },
  { name: "Contact", href: "#", icon: PhoneIcon },
];
const resources = [
  {
    name: "Projet",
    description:
      "Get all of your questions answered in our forums or contact support.",
    href: "#",
    icon: LifebuoyIcon,
  },
  {
    name: "Contact",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "#",
    icon: BookmarkSquareIcon,
  },
  {
    name: "Partenaires",
    description:
      "See what meet-ups and other events we might be planning near you.",
    href: "#",
    icon: CalendarIcon,
  },
  {
    name: "Accueil",
    description: "Understand how we take your privacy seriously.",
    href: "#",
    icon: ShieldCheckIcon,
  },
];
const recentPosts = [
  { id: 1, name: "Boost your conversion rate", href: "#" },
  {
    id: 2,
    name: "How to use search engine optimization to drive traffic to your site",
    href: "#",
  },
  { id: 3, name: "Improve your customer experience", href: "#" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  return (
    <Popover className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-95">
      <div className="px-4 mx-auto max-w-7xl sm:px-6">
        <div className="flex items-center justify-between py-6 border-b-2 border-gray-100 md:justify-start md:space-x-10">
          <div className="flex justify-start w-full h-full lg:w-0 lg:flex-1">
            <div
              className="relative w-full h-full cursor-pointer "
              onClick={() => router.push("/")}
            >
              <span className="sr-only">MOORIBEN</span>
              <img
                className="absolute w-auto h-16 -top-8 lg:-top-10 left-2 sm:h-24"
                src="https://firebasestorage.googleapis.com/v0/b/mooribenniger.appspot.com/o/LOGO-Transparant.png?alt=media&token=b2f227b7-4679-4f7c-a79c-a7591a0ba681"
                alt=""
              />
            </div>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
              <span className="sr-only">Menu</span>
              <Bars3Icon className="w-6 h-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden space-x-10 md:flex">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? "text-gray-900" : "text-gray-500",
                      "group inline-flex items-center rounded-md  text-sm font-medium hover:text-gray-900 focus:outline-none "
                    )}
                  >
                    <span>Actualité</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? "text-gray-600" : "text-gray-400",
                        "ml-2 h-5 w-5 group-hover:text-gray-500"
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 w-screen max-w-md px-2 mt-3 -ml-4 transform sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-6 px-5 py-6 bg-white sm:gap-8 sm:p-8">
                          {solutions.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-50"
                            >
                              <item.icon
                                className="flex-shrink-0 w-6 h-6 text-green-600"
                                aria-hidden="true"
                              />
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">
                                  {item.name}
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.description}
                                </p>
                              </div>
                            </a>
                          ))}
                        </div>
                        <div className="px-5 py-5 space-y-6 bg-gray-50 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                          {callsToAction.map((item) => (
                            <div key={item.name} className="flow-root">
                              <a
                                href={item.href}
                                className="flex items-center p-3 -m-3 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100"
                              >
                                <item.icon
                                  className="flex-shrink-0 w-6 h-6 text-green-700"
                                  aria-hidden="true"
                                />
                                <span className="ml-3">{item.name}</span>
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>

            <a
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              Activités
              {/* Agroécologie */}
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              Projets
            </a>

            <a
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              Partenaires
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              A propos
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              Contacts
            </a>
          </Popover.Group>
          <div className="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
            {user?.image ? (
              <img
                className="inline-block w-10 h-10 rounded-full cursor-pointer ring-2 hover:scale-105 ring-white"
                src={user?.image}
                onClick={() => router.push("/dashboard")}
                alt="avatar"
              />
            ) : (
              <div
                onClick={() => router.push("/auth/login")}
                className="inline-flex items-center justify-center px-4 py-2 ml-8 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm cursor-pointer whitespace-nowrap hover:bg-green-700"
              >
                Se connecter
              </div>
            )}
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 p-2 transition origin-top-right transform md:hidden"
        >
          <div className="bg-white divide-y-2 rounded-lg shadow-lg divide-gray-50 ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="w-auto h-8"
                    src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=600"
                    alt="Your Company"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {solutions.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center p-3 -m-3 rounded-md hover:bg-gray-50"
                    >
                      <item.icon
                        className="flex-shrink-0 w-6 h-6 text-green-600"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-900">
                        {item.name}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="px-5 py-6 space-y-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <a
                  href="#"
                  className="text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  Activités
                </a>

                <a
                  href="#"
                  className="text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  A propos
                </a>
                {resources.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-gray-900 hover:text-gray-700"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div>
                {user?.image ? (
                  <img
                    className="inline-block w-10 h-10 rounded-full cursor-pointer ring-2 hover:scale-105 ring-white"
                    src={user?.image}
                    onClick={() => router.push("/dashboard")}
                    alt="avatar"
                  />
                ) : (
                  <div
                    onClick={() => router.push("/auth/login")}
                    className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-green-700"
                  >
                    Se connecter
                  </div>
                )}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
