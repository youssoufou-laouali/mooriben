import type { NextPage } from "next";
import Accordion from "../components/Disclosure";
import CardArticle from "../components/CardArticle";
import CardWithoutImage from "../components/CardWithoutImage";
import DividerCard from "../components/DividerCard";
import HorizontalCard from "../components/HorizontalCard";
import PartenaireSlide from "../components/PartenaireSlide";
import SubHeader from "../components/SubHeader";
import TimelineMessage from "../components/TimelineMessage";
import WhatWeDo from "../components/WhatWeDo";
import Layout from "./_layout";
import axios from "axios";
import { ArticleInterface, url_api } from "../constant";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const getData = async () => {
    const res = await axios({
      method: "get",
      url: url_api + "/articles",
    });
    setArticles(res.data ?? []);
  };

  const [articles, setArticles] = useState<ArticleInterface[]>([]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <div>
        <SubHeader />
        <div className="flex flex-wrap items-center justify-center w-full m-auto max-w-7xl">
          {!(Array.isArray(articles) && articles?.length != 0) ? (
            <div>
              <div
                style={{ borderTopColor: "transparent" }}
                className="w-16 h-16 border-4 border-green-400 border-double rounded-full animate-spin"
              ></div>
            </div>
          ) : (
            articles?.map((el, index) => (
              <HorizontalCard key={index} article={el} />
            ))
          )}
        </div>

        <WhatWeDo />
        <DividerCard article={articles[0]} />
        <div className="flex items-center justify-center py-5 bg-gray-100">
          <div className="grid max-w-5xl grid-cols-12 gap-4">
            {!(Array.isArray(articles) && articles?.length != 0) ? (
              <div>
                <div
                  style={{ borderTopColor: "transparent" }}
                  className="w-16 h-16 border-4 border-green-400 border-double rounded-full animate-spin"
                ></div>
              </div>
            ) : (
              articles?.map((el, index) => (
                <CardWithoutImage key={index} article={el} />
              ))
            )}
          </div>
        </div>
        <DividerCard article={articles[1]} />

        <div className="flex flex-wrap justify-center w-full p-5 m-auto max-w-7xl">
          {!(Array.isArray(articles) && articles?.length != 0) ? (
            <div>
              <div
                style={{ borderTopColor: "transparent" }}
                className="w-16 h-16 border-4 border-green-400 border-double rounded-full animate-spin"
              ></div>
            </div>
          ) : (
            articles?.map((el, index) => (
              <CardArticle key={index} article={el} />
            ))
          )}
        </div>

        <div className="p-5 text-xl font-medium text-center text-green-500 lg:text-4xl lg:p-10">
          Nos Parténaires
        </div>
        <PartenaireSlide />
        <TimelineMessage />
        <div className="flex flex-wrap justify-center w-full m-auto max-w-7xl">
          <Accordion />
          <Accordion />
          <Accordion />
          <Accordion />
          <Accordion />
          <Accordion />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
