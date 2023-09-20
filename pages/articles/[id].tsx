import React, { useEffect, useState } from "react";
import { url_api } from "../../constant";
import Layout from "../_layout";
import { useRouter } from "next/router";
import axios from "axios";
import { EyeIcon } from "@heroicons/react/20/solid";

// id: 633ad33f6695d3a4927de9df
const Article = () => {
  const [article, setArticle] = useState({
    name: "",
    description: "",
    image: "",
    content: "",
    pdf: "",
    pdfTitle: "",
    categories: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const getData = async () => {
    const res = await axios({
      method: "get",
      url: url_api + "/articles/" + id,
    });
    setArticle(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <Layout>
      <div className="w-full max-w-4xl mx-auto">
        {isLoading ? (
          <div className="w-full mx-auto">
            <div
              style={{ borderTopColor: "transparent" }}
              className="w-16 h-16 border-4 border-green-400 border-double mx-auto rounded-full animate-spin"
            ></div>
          </div>
        ) : (
          ""
        )}
        <img
          src={article?.image}
          className="object-cover w-full max-w-sm pt-10 mx-auto"
          alt="Mooriben"
        />

        {/* Tag de l'article*/}
        {article?.categories?.map((el) => (
          <span
            key={el}
            className="inline-block px-4 py-1 mt-5 mb-3 ml-4 text-xs font-semibold leading-loose text-center text-green-500 bg-green-100 border-l-4 rounded-md border-l-green-500"
          >
            {el ?? ""}
          </span>
        ))}

        {/* Title de l'article*/}
        <p className="py-8 mx-auto text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-900">
          {article?.name}
        </p>

        {/* Corps du text de l'article*/}
        <div
          className="p-5 mx-auto text-base "
          dangerouslySetInnerHTML={{ __html: article?.content ?? "" }}
        ></div>

        <div className="text-base text-gray-600 text-right">
          Voir le fichier join:{" "}
          <a
            className="py-1 px-3 animate-pulse rounded-lg inline-block hover:scale-105 text-green-600 bg-green-100 border-2 hover:text-green-700 border-green-500"
            href={article.pdf}
          >
            <EyeIcon
              className={`h-5 inline-block m-2 ml-0 w-5  text-green-300`}
            />
            {article.pdfTitle}
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Article;
