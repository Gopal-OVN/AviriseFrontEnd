import { Link } from "react-router-dom";
import SideMenuNavSection from "../navigation/SideMenuNavSection";
import { useAppSelector } from "../../redux/hooks";
import { MutableRefObject } from "react";
import { sidebarAtom } from "../../redux/jotaiStore/sidebarnameAtom";
import { useAtom } from "jotai";
type Props = {
  logoutBtn?: boolean;
  customLogo?: string;
  noTitle?: boolean;
  sidebarRef: MutableRefObject<HTMLDivElement | null>;
  whiteBg?: boolean;
};
const LeftSidebarSection = ({
  logoutBtn,
  customLogo,
  noTitle,
  sidebarRef,
  whiteBg,
}: Props) => {
  const darkMode = useAppSelector((state) => state.theme.isDark);
  const sidebarBgImage = useAppSelector((state) => state.sidebarBg.sidebarBg);
  const [isSidebarName] = useAtom(sidebarAtom); // Read-only access

  return (
    <div
      className={`webdesh-sidemenu-area ${
        sidebarBgImage !== "" ? "sidebar-bg-detected" : ""
      }`}
      id="sideMenuWrapper"
      style={{
        width: isSidebarName ? "120px" : "210px",
        ...(sidebarBgImage !== "" && {
          backgroundImage: `url(${sidebarBgImage})`,
        }),
      }}
      ref={sidebarRef}
    >
      <div className="webdesh-logo">
        {customLogo ? (
          <Link to="/">
            <img className="white-logo" src={customLogo} alt="logo" />
          </Link>
        ) : (
          <Link to="/">
            <img
              src={
                whiteBg && !darkMode
                  ? "/img/core-img/logo-white.png"
                  : whiteBg && darkMode
                  ? "https://avirise.com/wp-content/uploads/2024/12/Avirise-Logo-1.png"
                  : "https://avirise.com/wp-content/uploads/2024/12/Avirise-Logo-1.png"
              }
              alt="logo"
            />
          </Link>
        )}
      </div>
      <div className="webdesh-sidenav" id="webdeshSideNav">
        <SideMenuNavSection logoutBtn={logoutBtn} noTitle={noTitle} />
      </div>
    </div>
  );
};
export default LeftSidebarSection;
