import { Link } from "react-router-dom";
import { useMemo } from "react";
import { MenuItem } from "../../types";
import { sidebarAtom } from "../../redux/jotaiStore/sidebarnameAtom";
import { useAtom } from "jotai";

type Props = {
  activeDropdown: string;
  pathname: string;
  toggleDropdown: (dropdown: string) => void;
  noTitle?: boolean;
  navData: MenuItem[]; // Accept navData as a prop
};

const NavSingleSection = ({
  activeDropdown,
  pathname,
  toggleDropdown,
  noTitle,
  navData,
}: Props) => {
  const [isSidebarName] = useAtom(sidebarAtom); // Read-only access
  // Transform flat menu data into hierarchical structure
  const structuredMenu = useMemo(() => {
    const menuMap: Record<number, MenuItem> = {};
    const rootMenu: MenuItem[] = [];

    navData.forEach((item) => {
      menuMap[item.menu_id] = { ...item, children: [] };
    });

    navData.forEach((item) => {
      if (item.parent_id && menuMap[item.parent_id]) {
        menuMap[item.parent_id].children?.push(menuMap[item.menu_id]);
      } else {
        rootMenu.push(menuMap[item.menu_id]);
      }
    });

    return rootMenu;
  }, [navData]);

  const sortedMenu = [...structuredMenu]
    .sort((a: any, b: any) => a.menu_order - b.menu_order)
    .map((item) => ({
      ...item,
      children: item.children
        ? [...item.children].sort(
            (a: any, b: any) => a.child_order - b.child_order
          )
        : [],
    }));

  return (
    <>
      {sortedMenu.map((item) => (
        <li
          key={item.menu_id}
          className={`treeview ${
            activeDropdown === item.menu_name ? "menu-open" : ""
          } ${pathname === item.url ? "active" : ""}`}
        >
          {item?.children?.length > 0 ? (
            // Parent menu items (Toggle dropdown)
            <a role="button" onClick={() => toggleDropdown(item.menu_name)}>
              <i className={item.icon_name}></i>
              {!isSidebarName && !noTitle && (
                <div
                  className="text-truncate d-inline-block"
                  style={{ maxWidth: 145 }}
                >
                  <span>{item.menu_name}</span>
                </div>
              )}

              <i className="ti ti-chevron-right"></i>
            </a>
          ) : (
            // Direct navigation for menu items without children
            <Link
              to={item.url}
              className={pathname === item.url ? "active" : ""}
            >
              <i className={item.icon_name}></i>
              {!isSidebarName && !noTitle && (
                <div>
                  <span>{item.menu_name}</span>
                </div>
              )}
            </Link>
          )}

          {/* Render Submenu */}
          {item?.children?.length > 0 && (
            <ul
              className={`ps-0 treeview-menu ${
                activeDropdown === item.menu_name ? "menu-open" : ""
              }`}
            >
              {item?.children?.map((subItem) => (
                <li
                  key={subItem.menu_id}
                  className={pathname === subItem.url ? "active " : ""}
                >
                  <Link to={subItem.url}>
                    {/* <i className={subItem.icon_name}></i> */}
                    <span className=" ps-4 ">{subItem.menu_name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </>
  );
};

export default NavSingleSection;
