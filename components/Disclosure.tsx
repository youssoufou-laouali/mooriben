import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

export default function Example() {
  return (
    <div className="w-full max-w-md px-4">
      <div className="w-full p-2 mx-auto bg-white rounded-2xl">
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-green-900 bg-green-100 rounded-lg hover:bg-green-200 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75">
                <span>Do you offer technical support?</span>
                <div>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-green-500`}
                  />
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                No. technical support? technical support? technical support?
                technical support? technical support? technical support?
                technical support? technical support? technical support?
                technical support? technical support?
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
