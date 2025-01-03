import React from "react";
import CategoryPage from "@/app/topic/Components/CategoryPage/index";
import Loading from "@/shared/components/Loading/index";

const Page = (props) => {
  return (
    <Loading>
      <CategoryPage {...props} />
    </Loading>
  );
};

export default Page;
