import "./style.scss";
import { BACKEND_URL } from "../../../shared/constants/ulrList";
import NavItem from "@/shared/components/header/Modules/NavItem";
import SubCategory from "@/shared/components/header/Modules/SubCategory";
import TopHeader from "@/shared/components/header/Modules/TopHeader/Index";
import OtherNavItem from "@/shared/components/header/Modules/OtherNavItem/index";
import OtherNavigation from "@/shared/components/header/Modules/OtherNavigation/index";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import SearchSection from "@/shared/components/header/Modules/SearchSection/index";
import MenuBtnSection from "@/shared/components/header/Modules/MenuBtnSection/index";
import MobileNavigation from "@/shared/components/MobileNavigation/index";



const homeIcon = <FaHome />;
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

const Index = async () => {
  const categories = await getCategories();
  // const mainCategories = await [...categories].slice(0, 7)
  const otherCategories = await categories.slice(
    7,
    Number(categories.length + 1)
  );
 

  return (
    <header className="header">
      <TopHeader />
      <div className="navigation-container ">
        <div className="inner-container container">
          <nav className="navigation-wrapper" >
            <ul className="">
              <li>
                <NavItem
                  currentPath="/"
                  currentLabel="প্রচ্ছদ"
                  icon={homeIcon}
                />
              </li>
              {categories?.length > 0 &&
                [...categories].map((routeInfo, index) => {
                  return (
                    <li
                      key={routeInfo._id}
                      className={index > 6 ? "mobile-li" : ""}
                    >
                      <NavItem
                        currentPath={`/topic/${routeInfo.route}`}
                        currentLabel={routeInfo.label}
                      />
                      {routeInfo?.subCategories?.length > 0 && (
                        <>
                          <SubCategory
                            subCategories={routeInfo?.subCategories}
                            routeInfo={routeInfo}
                          />
                        </>
                      )}
                    </li>
                  );
                })}
              <li className="other-li">
                <OtherNavItem />
                <button>
                  <IoMdArrowDropdown />
                </button>
                <OtherNavigation categories={otherCategories} />
              </li>
            </ul>
            {/* <OthersNavigation/> */}
          </nav>
         <MenuBtnSection/>
        </div>
        <SearchSection/>
      </div>
      <MobileNavigation/>
    </header>
  );
};

export default Index;
