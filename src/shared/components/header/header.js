import "./style.scss";
import { BACKEND_URL } from "../../../shared/constants/ulrList";
import SubCategory from "@/shared/components/header/Modules/SubCategory";
import TopHeader from "@/shared/components/header/Modules/TopHeader/Index";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import SearchSection from "@/shared/components/header/Modules/SearchSection/index";
import MenuBtnSection from "@/shared/components/header/Modules/MenuBtnSection/index";
import MobileNavigation from "@/shared/components/MobileNavigation/index";
import Link from "next/link";

const getCategories = async () => {
  try {
    const response = await (
      await fetch(`${BACKEND_URL}/public/categories`, { cache: "no-store" })
    ).json();

    if (response.data?.length) {
      return response.data;
    }
    return [];
  } catch (error) {
    return [];
  }
};

const Index = async (props) => {
  const pageRoute = props?.searchParams?.route;
  const categories = await getCategories();
  return (
    <header className="header">
      <TopHeader />
      <div className="navigation-container ">
        <div className="inner-container container">
          <nav className="navigation-wrapper rm-scroll-bar" id="header-nav">
            <ul className="">
              <li className={`${"/" === pageRoute ? "active" : ""}`}>
                <Link href={"/"}>
                  <FaHome />
                </Link>
              </li>
              {categories?.length > 0 &&
                [...categories].map((routeInfo, index) => {
                  let itemRoute = `/topic/${routeInfo.route}`;
                  return (
                    <li
                      key={routeInfo._id}
                      className={`${index > 15 ? "mobile-li" : ""} ${
                        itemRoute === pageRoute ? "active" : ""
                      }`}
                    >
                      <Link href={itemRoute} className="nav-item">{routeInfo.label}</Link>
                      {routeInfo?.subCategories?.length > 0 && (
                        <>
                          <SubCategory
                            subCategories={routeInfo?.subCategories}
                            routeInfo={routeInfo}
                            pageRoute={pageRoute}
                          />
                        </>
                      )}
                    </li>
                  );
                })}
            </ul>
            {/* <OthersNavigation/> */}
          </nav>
          <MenuBtnSection />
        </div>
        <SearchSection />
        <MobileNavigation />
      </div>
    </header>
  );
};

export default Index;
