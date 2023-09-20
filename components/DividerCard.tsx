import { useRouter } from "next/router";
import React from "react";
import { ArticleInterface } from "../constant";

const DividerCard = ({ article }: { article: ArticleInterface }) => {
  const router = useRouter();
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="grid max-w-5xl grid-cols-6 mx-8 bg-green-800 rounded-xl">
          <div
            className="col-span-4 cursor-pointer"
            onClick={() => {
              router.push(`/articles/${article?.id}`);
            }}
          >
            <h2 className="mt-8 ml-10 text-xl font-bold text-white">
              {article?.name}
            </h2>

            <p className="mt-5 ml-10 line-clamp-3 text-sm font-light text-white">
              {article?.description}
            </p>

            <button className="mt-5 mb-8 ml-10 font-semibold text-white group ">
              Consulter
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block w-6 h-6 transition delay-100 group-hover:translate-x-2 transition-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>

          <div className="relative  overflow-hidden col-span-2">
            <img
              // src="https://www.digitalocean.com/_next/static/media/cloudJourneyImage.954519ea.svg"
              src={article?.image}
              className="absolute bottom-0 right-0 "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DividerCard;
