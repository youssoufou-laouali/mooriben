import React from "react";

const WhatWeDo = () => {
  return (
    <div>
      <section className="container pt-5 mx-auto bg-white lg:pt-10 max-w-8xl">
        <div>
          <div className="lg:text-center">
            <h2 className="text-lg font-semibold text-green-600">
              Transactions
            </h2>
            <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              A better way to send money
            </p>
            <p className="max-w-2xl mt-4 text-xl text-gray-500 lg:mx-auto">
              Lorem ipsum dolor sit amet consect adipisicing elit. Possimus
              magnam voluptatum cupiditate veritatis in accusamus quisquam.
            </p>
          </div>
          <div
            aria-label="group of cards"
            className="flex flex-wrap justify-center gap-10 px-4 mt-20 focus:outline-none"
          >
            <div
              aria-label="card 1"
              className="flex pb-20 focus:outline-none sm:w-full md:w-5/12"
            >
              <div className="relative w-20 h-20 mr-5">
                <div className="absolute top-0 right-0 w-16 h-16 mt-2 mr-1 bg-green-100 rounded"></div>
                <div className="absolute bottom-0 left-0 flex items-center justify-center w-16 h-16 mt-2 mr-3 text-white bg-green-700 rounded">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/icon_and_text-SVG1.svg"
                    alt="drawer"
                    className="animate-bounce"
                  />
                </div>
              </div>
              <div className="w-10/12">
                <h2 className="text-lg font-bold leading-tight text-gray-800 focus:outline-none">
                  Ready to use components
                </h2>
                <p className="pt-2 text-sm leading-normal text-gray-600 focus:outline-none">
                  It provides a very simple start, no need to write a lot of
                  code, you just import it and start the primitive components
                  and create the ones you need.
                </p>
              </div>
            </div>
            <div
              aria-label="card 2"
              className="flex pb-20 focus:outline-none sm:w-full md:w-5/12"
            >
              <div className="relative w-20 h-20 mr-5">
                <div className="absolute top-0 right-0 w-16 h-16 mt-2 mr-1 bg-green-100 rounded"></div>
                <div className="absolute bottom-0 left-0 flex items-center justify-center w-16 h-16 mt-2 mr-3 text-white bg-green-700 rounded">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/icon_and_text-SVG2.svg"
                    alt="check"
                    className="animate-pulse"
                  />
                </div>
              </div>
              <div className="w-10/12">
                <h2 className="text-lg font-semibold leading-tight text-gray-800 focus:outline-none">
                  Hight Quality UI you can reply on
                </h2>
                <p className="pt-2 text-sm leading-normal text-gray-600 focus:outline-none">
                  Modify the visual appearance of your site – including colors,
                  fonts, margins and other style-related properties – with a
                  sophisticated style.
                </p>
              </div>
            </div>
            <div
              aria-label="card 3"
              className="flex pb-20 focus:outline-none sm:w-full md:w-5/12"
            >
              <div className="relative w-20 h-20 mr-5">
                <div className="absolute top-0 right-0 w-16 h-16 mt-2 mr-1 bg-green-100 rounded"></div>
                <div className="absolute bottom-0 left-0 flex items-center justify-center w-16 h-16 mt-2 mr-3 text-white bg-green-700 rounded">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/icon_and_text-SVG3.svg"
                    alt="html tag"
                    className="animate-spin "
                  />
                </div>
              </div>
              <div className="w-10/12">
                <h2 className="text-lg font-semibold leading-tight text-gray-800 focus:outline-none">
                  Coded by Developers for Developers
                </h2>
                <p className="pt-2 text-sm leading-normal text-gray-600 focus:outline-none">
                  Instead of just giving you the tools to create your own site,
                  they offer you a list of themes you can choose from. Thus a
                  handy product.
                </p>
              </div>
            </div>
            <div
              aria-label="card 4"
              className="flex pb-20 focus:outline-none sm:w-full md:w-5/12"
            >
              <div className="relative w-20 h-20 mr-5">
                <div className="absolute top-0 right-0 w-16 h-16 mt-2 mr-1 bg-green-100 rounded"></div>
                <div className="absolute bottom-0 left-0 flex items-center justify-center w-16 h-16 mt-2 mr-3 text-white bg-green-700 rounded">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/icon_and_text-SVG4.svg"
                    alt="monitor"
                    className="animate-ping"
                  />
                </div>
              </div>
              <div className="w-10/12">
                <h2 className="text-lg font-semibold leading-tight text-gray-800 focus:outline-none">
                  The Last UI kit you’ll ever need
                </h2>
                <p className="pt-2 text-sm leading-normal text-gray-600 focus:outline-none">
                  We have chosen the bright color palettes that arouse the only
                  positive emotions. The kit that simply assures to be loved by
                  everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhatWeDo;
