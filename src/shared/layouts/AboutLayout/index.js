import React from "react";
import "./styles.scss";
import Header from "@/shared/components/header/header";
import Footer from "@/shared/components/Footer/Footer";

const Index = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="about-layout html-view-page container">{children}</div>
      <Footer />
    </div>
  );
};

export default Index;
