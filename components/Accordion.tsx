import { Disclosure, Transition } from "@headlessui/react";
import {
  ChevronUpIcon,
  ArrowTopRightOnSquareIcon,
  EyeIcon,
  PencilIcon,
  CloudArrowDownIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import Avatars from "./Avatars";

export default function Example({
  description,
  id,
  title,
  url,
  users,
  name,
}: {
  users: any;
  title: string;
  description: string;
  url: string;
  id: string;
  name: string;
}) {
  return (
    <div className="w-full pt-3">
      <div className="w-full mx-auto bg-white rounded-2xl">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-green-900 border border-gray-100 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75">
                <div className="flex pt-2 w-28 overflow-hidden">
                  <ArrowTopRightOnSquareIcon
                    className={`h-5 w-5 mr-3 text-green-200`}
                  />
                  <div className="hidden md:block">
                    <Avatars images={users} />
                  </div>
                </div>

                <div className="max-w-sm pt-2 overflow-hidden w-full line-clamp-2">
                  {title}: <span className="text-xs">{name}</span>
                </div>
                <div
                  className="flex flex-col md:flex-row"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Link href={url}>
                    <div className="flex p-1 m-1 shadow-sm md:px-3 md:py-2 hover:scale-110">
                      <EyeIcon
                        className={`h-5  transition-transform w-5 hover:text-blue-400 text-gray-300`}
                      />
                      {/* <div>Voir</div> */}
                    </div>
                  </Link>
                  <div className="flex p-1 m-1 text-center shadow-sm md:px-3 md:py-2 hover:scale-110">
                    <PencilIcon
                      className={`h-4   transition-transform w-5 hover:text-green-400 text-gray-300`}
                    />
                    {/* <div>Editer</div> */}
                  </div>
                  <div className="flex p-1 m-1 shadow-sm md:px-3 md:py-2 hover:scale-110">
                    <CloudArrowDownIcon
                      className={`h-5   transition-transform w-5 hover:text-indigo-400 text-gray-300`}
                    />
                    {/* <div>Télécharger</div> */}
                  </div>
                </div>
                <div>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-green-500`}
                  />
                </div>
              </Disclosure.Button>
              <Transition
                enter="transition duration-500 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-500 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  {description}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
