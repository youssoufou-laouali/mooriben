import { useRouter } from "next/router";
import React from "react";
import { ArticleInterface } from "../constant";

const HorizontalCard = ({ article }: { article: ArticleInterface }) => {
  const router = useRouter();
  return (
    <div>
      <div
        className="p-5 hover:bg-gray-50 cursor-pointer m-3 border border-l-2 border-gray-200 rounded"
        onClick={() => {
          router.push(`/articles/${article?.id}`);
        }}
      >
        <div className="flex flex-col max-w-sm">
          <header className="flex flex-row items-center gap-3">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/mooribenniger.appspot.com/o/LOGO-Transparant.png?alt=media&token=b2f227b7-4679-4f7c-a79c-a7591a0ba681"
              className="rounded-full h-14"
            />
            <div> Mooriben </div>
            <div className="text-sm text-gray-500">
              {" "}
              {new Date(article?.createdAt).getDate()}/
              {new Date(article?.createdAt).getMonth() + 1}/
              {new Date(article?.createdAt).getFullYear()}{" "}
            </div>
          </header>

          <div className="grid grid-cols-4 gap-3">
            <div className="flex flex-col col-span-3">
              <div className="pt-3 text-base font-bold line-clamp-2">
                {article?.name}
              </div>

              <div className="pt-2 line-clamp-6 text-sm font-light">
                {article?.description}
              </div>
            </div>

            <div className="flex items-center">
              <img
                src={article?.image}
                className="h-full w-full "
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          <footer className="flex flex-row items-center gap-3 pt-7">
            {article?.categories?.map((el, i) => (
              <button
                key={i}
                className="px-2 py-1 text-xs duration-100 delay-100 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                {el}
              </button>
            ))}

            {/* <div className="text-xs text-gray-500">7 min read</div>

            <div className="text-xs text-gray-500">
              Based on your reading history
            </div> */}
          </footer>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;
