import Head from "next/head";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Layout = ({ children }: any) => {
  return (
    <div>
      <Head>
        <title>Mooriben Niger</title>
        <meta name="description" content="Mooriben Niamey Niger" />
        <link
          rel="icon"
          href="https://firebasestorage.googleapis.com/v0/b/mooribenniger.appspot.com/o/LOGO-JPEG.jpg?alt=media&token=b73aabbf-9911-4f27-8bf5-a0dcf06a7db6"
        />
      </Head>
      <Header />
      <div className="h-24 "></div>

      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
