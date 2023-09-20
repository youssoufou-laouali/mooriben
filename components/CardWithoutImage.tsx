import { useRouter } from "next/router";
import React from "react";
import { ArticleInterface } from "../constant";

const CardWithoutImage = ({ article }: { article: ArticleInterface }) => {
  const router = useRouter();
  return (
    <div
      className="relative grid cursor-pointer col-span-12 lg:col-span-4"
      onClick={() => {
        router.push(`/articles/${article?.id}`);
      }}
    >
      <div
        style={{
          backgroundImage: `url("${article?.image}")`,
        }}
        className="w-full transition duration-1000 delay-75 bg-white rounded-sm shadow-lg group hover:shadow-2xl "
      >
        <div
          className="h-full w-full py-6 pr-6 pl-9"
          style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
        >
          <p className="text-base line-clamp-3 font-bold text-green-700 group-hover:text-green-800">
            {article?.name}
          </p>

          <p className="mt-2 text-sm line-clamp-3 font-semibold leading-6 text-gray-600 group-hover:text-gray-700">
            {article?.description}
          </p>

          <div className="absolute top-0 left-0 w-4 h-full bg-green-400 group-hover:bg-green-600">
            {" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardWithoutImage;
