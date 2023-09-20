import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  HomeModernIcon,
  BookmarkSquareIcon,
  CalendarIcon,
  UserGroupIcon,
  UserIcon,
  CursorArrowRaysIcon,
  LifebuoyIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

const solutions = [
  {
    name: "Tableau de bord",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "#",
    icon: Squares2X2Icon,
  },
  {
    name: "Profil",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: UserIcon,
  },
  {
    name: "Partager",
    description: "Your customers' data will be safe and secure.",
    href: "#",
    icon: ShieldCheckIcon,
  },
  {
    name: "Utilisateurs",
    description: "Connect with third-party tools that you're already using.",
    href: "#",
    icon: UserGroupIcon,
  },
  {
    name: "Accueil",
    description:
      "Build strategic funnels that will drive your customers to convert",
    href: "#",
    icon: HomeModernIcon,
  },
];

export default function Example() {
  const router = useRouter();
  return (
    <Popover className="">
      <div className="px-4 mx-auto max-w-7xl sm:px-6">
        <div className="flex items-center justify-end md:space-x-10">
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
              <span className="sr-only">Menu</span>
              <Bars3Icon className="w-6 h-6" aria-hidden="true" />
            </Popover.Button>
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
                  {/* <img
                    className="w-auto h-8"
                    src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=600"
                    alt="Your Company"
                  /> */}
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
              <div>
                <div
                  onClick={() => router.push("/auth/login")}
                  className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-green-700"
                >
                  Se déconnecter
                </div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
