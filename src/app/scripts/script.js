"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
const setNavPosition = (e) => {
  if (!e) {
    return;
  }
  // e.preventDefault();
  const eleHeight = e.target.offsetHeight;
  const rect = e.target.getBoundingClientRect();
  const posX = rect.left;
  const posY = rect.top;
  const subCategoryElements = document.querySelectorAll(".sub-category-nav");
  subCategoryElements.forEach((ele) => {
    ele.style.top = `${posY + eleHeight + 6}px`;
    ele.style.left = `${posX - 10}px`;
  });
};

export default function Index() {
  const pathname = usePathname();

  useEffect(() => {
    // return
    const headerNav = document.getElementById("header-nav");
    const aElements = headerNav?.querySelectorAll(".nav-item");
    

    if (aElements) {
      aElements.forEach((element) => {
        element.addEventListener("click", setNavPosition);
        element.addEventListener("mouseover", setNavPosition);

      });
    } 

    // Cleanup event listeners
    return () => {
      if (aElements) {
        aElements.forEach((aElement) => {
          aElement.removeEventListener("click", setNavPosition);
          aElement.removeEventListener("mouseover", setNavPosition);
        });
      }
    };
  }, [pathname]);

  return null; // This component doesn't render anything
}
