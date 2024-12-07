import React, { Suspense } from "react";
import Spinner from "@/shared/components/Loading/Components/Spinner/index";

const Index = ({children}) => {
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
};

export default Index;
