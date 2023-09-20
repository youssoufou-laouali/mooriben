import React from "react";
import Slider from "./Slider";

export default function Example() {
  return (
    <div className="relative flex mx-auto overflow-hidden bg-white max-w-7xl">
      <div className="h-full ">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 md:w-full md:max-w-2xl">
          <main className="px-4 pt-10 mx-auto max-w-7xl sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                <span className="block xl:inline">la misère est finie</span>{" "}
                <span className="block text-green-600 xl:inline">
                  FUGPN-Mooriben
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                1541 groupements implantés dans 732 villages administratifs
                totalisant 56 626 membres dont 63% de femmes
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className="flex items-center justify-center w-full px-8 py-3 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md animate-pulse hover:bg-green-700 md:py-4 md:px-10 md:text-lg"
                  >
                    Agroécologie
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#"
                    className="flex items-center justify-center w-full px-8 py-3 text-sm font-medium text-green-700 bg-green-100 border border-transparent rounded-md hover:bg-green-200 md:py-4 md:px-10 md:text-lg"
                  >
                    Découvrir plus
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="relative hidden w-full h-full max-w-screen-sm lg:block max-h-96">
        <svg
          className="absolute z-20 hidden w-48 h-full text-white -left-24 lg:block"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon points="50,0 100,0 50,100 0,100" />
        </svg>
        <Slider />
      </div>
    </div>
  );
}
