import { useRouter } from "next/router";
import React from "react";
import { ArticleInterface } from "../constant";

const CardArticle = ({ article }: { article: ArticleInterface }) => {
  const router = useRouter();
  return (
    <div className="w-full max-w-xs m-3">
      <div
        className="flex cursor-pointer items-center justify-center"
        onClick={() => {
          router.push(`/articles/${article?.id}`);
        }}
      >
        <div className="text-center bg-white border border-gray-100 rounded-lg hover:shadow-lg align-center">
          <div>
            <img
              src={article?.image}
              className="h-48 w-full"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="flex justify-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/mooribenniger.appspot.com/o/LOGO-JPEG.jpg?alt=media&token=b73aabbf-9911-4f27-8bf5-a0dcf06a7db6"
              className="object-center  h-16 -mt-6 border-4 border-white rounded-lg shadow-lg align-center"
            />
          </div>

          <p className="pt-2 pb-2 line-clamp-3 font-bold"> {article?.name} </p>

          <p className="p-2 text-sm font-semibold text-gray-500">
            {" "}
            par{" "}
            <a href="#" className="text-green-500 hover:text-green-700">
              MOORIBEN
            </a>{" "}
          </p>

          <p className="px-5 py-2 mb-5 line-clamp-6 text-gray-500">
            {article?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardArticle;
