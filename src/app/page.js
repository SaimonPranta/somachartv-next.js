import { Suspense } from "react";
import Image from "next/image";
import "./globals.css";
import HomePage from "./home/home";
import Loading from "@/shared/components/Loading/index";

export default function Home(props) { 
// export default function Home({searchParams: {route}}) { 
  return (
    <Loading>
      <main>
        <HomePage {...props} />
      </main>
    </Loading>
  );
}
