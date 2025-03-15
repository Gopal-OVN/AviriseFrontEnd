import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import LeftSidebarSection from "../sidebar/LeftSidebarSection";
import FooterSection from "../footer/FooterSection";
import { useEffect, useRef, useState } from "react";
import HeaderSection from "../header/HeaderSection";
import { useAtom } from "jotai";
import { sidebarAtom } from "../../redux/jotaiStore/sidebarnameAtom";

const InnerLayoutStyle1 = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);
  const mainBackgroundImg = useAppSelector((state) => state.mainBg.mainBg);

  const [isSidebarName] = useAtom(sidebarAtom); // Read-only access

  // sidebar
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const toggleSidebarOpen = () => {
    setSidebarOpen(true);
  };
  const sidebarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <div
      className={`home-courier ${darkMode ? "dark-theme" : "light-theme"} ${
        mainBackgroundImg !== "" ? "bg-detected" : ""
      } ${sidebarOpen ? "mobile-menu-open" : ""}`}
      style={{
        ...(mainBackgroundImg !== "" && {
          backgroundImage: `url(${mainBackgroundImg})`,
        }),
      }}
    >
      <div className="webdesh-page-wrapper">
        <LeftSidebarSection sidebarRef={sidebarRef} />
        <div
          className={`webdesh-page-content ${
            isSidebarName ? "sidebar-open" : ""
          }`}
        >
          <HeaderSection toggleSidebarOpen={toggleSidebarOpen} />
          <div className="main-content-wrap">
            <div className="main-container container-fluid">
              <Outlet />
            </div>
            <div className="mt-4"></div>
            <FooterSection footerStyle="mt-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default InnerLayoutStyle1;
