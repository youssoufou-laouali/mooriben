import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({
  totals,
  currentPage,
  onChangePage,
}: {
  totals: number;
  onChangePage: any;
  currentPage: number;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
      <div className="flex justify-between flex-1 sm:hidden">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onChangePage(currentPage - 1);
          }}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onChangePage(currentPage + 1);
          }}
          className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <div className="text-sm text-gray-700">
            Total: <div className="inline-block font-medium">{totals}</div>{" "}
            resultats
          </div>
        </div>
        <div>
          <div
            className="inline-flex -space-x-px rounded-md shadow-sm isolate"
            aria-label="Pagination"
          >
            <div
              className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-20"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(currentPage < Math.ceil(totals / 10));
                if (currentPage > 1) onChangePage(currentPage - 1);
              }}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
            </div>
            {Array.apply(null, Array(Math.ceil(totals / 10)))
              .map(function (x, i) {
                return i;
              })
              .map((el, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (currentPage != index + 1) onChangePage(index + 1);
                  }}
                  aria-current="page"
                  className={classNames(
                    "relative inline-flex cursor-pointer items-center px-4 py-2 text-sm font-medium   focus:z-20",
                    currentPage != index + 1
                      ? "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100"
                      : "text-green-600 border border-green-500 bg-green-50",
                    index > currentPage + 5 || index < currentPage - 5
                      ? "hidden"
                      : "block"
                  )}
                >
                  {index + 1}
                </div>
              ))}

            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (currentPage < Math.ceil(totals / 10))
                  onChangePage(currentPage + 1);
              }}
              className={
                "relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:z-20"
              }
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
