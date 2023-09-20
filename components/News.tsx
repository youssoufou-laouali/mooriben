import { MegaphoneIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Example() {
  return (
    <div className="m-3 text-sm bg-green-600 rounded">
      <div className="px-3 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center flex-1 w-0">
            <span className="flex p-2 bg-green-800 rounded-lg">
              <MegaphoneIcon
                className="w-6 h-6 text-white"
                aria-hidden="true"
              />
            </span>
            <p className="ml-3 font-medium text-white truncate">
              <span className="md:hidden">We announced a new product!</span>
              <span className="hidden md:inline">
                Big news! We re excited to announce a brand new product.
              </span>
            </p>
          </div>
          <div className="flex-shrink-0 order-3 w-full mt-2 sm:order-2 sm:mt-0 sm:w-auto">
            <a
              href="#"
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-green-600 bg-white border border-transparent rounded-md shadow-sm hover:bg-green-50"
            >
              Learn more
            </a>
          </div>
          <div className="flex-shrink-0 order-2 sm:order-3 sm:ml-3">
            <button
              type="button"
              className="flex p-2 -mr-1 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="w-6 h-6 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
