import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useAppSelector } from "../../redux/hooks";
import NavSingleSection from "./NavSingleSection";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { fetchMenuListAPI } from "../../services/menu-privilege-service";

type Props = {
  noTitle?: boolean;
  noDefaultOpen?: boolean;
};

const SideMenuNavSection = ({ noTitle, noDefaultOpen }: Props) => {
  const location = useLocation();
  const pathname = location.pathname;
  const navRef = useRef<HTMLDivElement>(null);
  const activeLayout = useAppSelector((state) => state.layout.isLayout);

  const me = JSON.parse(localStorage.getItem("me") || "{}");

  console.log("pppp............", me?.role_id);

  const { data: navData = [] } = useQuery("MenuQuery", async () => {
    try {
      return await fetchMenuListAPI(me?.role_id);
    } catch (error: any) {
      toast.error(error.message || "Error fetching menu data");
      return [];
    }
  });

  const findActiveDropdownTitle = (currentPathname: string): string => {
    for (const item of navData) {
      if (item.hasSub && item.subLinks) {
        if (
          item.subLinks.some(
            (subLink: any) => subLink.subUrl === currentPathname
          )
        ) {
          return item.name;
        }
      }
    }
    return "";
  };

  const findDropdown = findActiveDropdownTitle(pathname);
  const [activeDropdown, setActiveDropdown] = useState<string>(
    noDefaultOpen ? "" : findDropdown
  );

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown((prev) => (prev === dropdown ? "" : dropdown));
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        activeLayout === "style-5" &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [activeLayout]);

  return (
    <OverlayScrollbarsComponent className="side-menu-area">
      <nav ref={navRef}>
        <ul className="ps-0 sidebar-menu">
          <NavSingleSection
            navData={navData} // Passing navData here
            activeDropdown={activeDropdown}
            pathname={pathname}
            toggleDropdown={toggleDropdown}
            noTitle={noTitle}
          />
        </ul>
      </nav>
    </OverlayScrollbarsComponent>
  );
};

export default SideMenuNavSection;
