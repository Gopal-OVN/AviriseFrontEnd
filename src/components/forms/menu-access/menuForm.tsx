import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { fetchMenuAPI } from "../../../services/menu-service";

interface MenuItem {
  menu_id: number;
  menu_name: string;
  parent_id: number | null;
  children?: MenuItem[];
}

const MenuForm = ({ data }: any) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const [menus, setMenus] = useState<MenuItem[]>([]);
  const selectedMenus = watch("menu_ids") || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const menusData: MenuItem[] = await fetchMenuAPI();
        const treeData = buildTree(menusData);
        setMenus(treeData);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };
    fetchData();

    if (data?.menus) {
      const preselectedMenuIds = data.menus.map((menu: any) => menu.menu_id);
      setValue("menu_ids", preselectedMenuIds);
    }
  }, [data, setValue]);

  // Convert list to tree structure
  const buildTree = (items: MenuItem[]) => {
    const map = new Map();
    const tree: MenuItem[] = [];

    items.forEach((item) => {
      map.set(item.menu_id, { ...item, children: [] });
    });

    items.forEach((item) => {
      if (item.parent_id) {
        const parent = map.get(item.parent_id);
        if (parent) parent.children.push(map.get(item.menu_id));
      } else {
        tree.push(map.get(item.menu_id));
      }
    });

    return tree;
  };

  // Handle selection logic
  const handleCheckboxChange = (menu: MenuItem, isChecked: boolean) => {
    let newSelectedMenus = [...selectedMenus];

    if (isChecked) {
      newSelectedMenus.push(menu.menu_id);

      // Auto-select parent if a child is selected
      if (menu.parent_id && !selectedMenus.includes(menu.parent_id)) {
        newSelectedMenus.push(menu.parent_id);
      }
    } else {
      newSelectedMenus = newSelectedMenus.filter((id) => id !== menu.menu_id);
    }

    setValue("menu_ids", newSelectedMenus);
  };

  return (
    <div className="container-fluid  p-4">
      <h6>Select Menus:</h6>
      <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 g-2">
        {menus.map((menu) => (
          <div key={menu.menu_id} className="col">
            <MenuItemComponent
              menu={menu}
              selectedMenus={selectedMenus}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
        ))}
      </div>
      {errors.menu_ids?.message && (
        <p className="text-danger mt-2">{String(errors.menu_ids.message)}</p>
      )}
    </div>
  );

};

// Recursive Menu Component with Parent Disable Logic
const MenuItemComponent = ({
  menu,
  selectedMenus,
  handleCheckboxChange,
}: {
  menu: MenuItem;
  selectedMenus: number[];
  handleCheckboxChange: (menu: MenuItem, isChecked: boolean) => void;
}) => {
  const hasSelectedChildren = menu.children?.some((child) => selectedMenus.includes(child.menu_id)) ?? false;
  const isParentDisabled = hasSelectedChildren;

  return (
    <div className="col-12 mb-2 ms-3">
      <input
        type="checkbox"
        id={`menu-${menu.menu_id}`}
        className="form-check-input"
        checked={selectedMenus.includes(menu.menu_id)}
        disabled={isParentDisabled} // Disable parent checkbox if any child is selected
        onChange={(e) => handleCheckboxChange(menu, e.target.checked)}
      />
      <label htmlFor={`menu-${menu.menu_id}`} className="form-check-label text-gray-700 ms-2">
        {menu.menu_name}
      </label>

      {menu.children && menu.children.length > 0 && (
        <div className="ms-4">
          {menu.children.map((child) => (
            <MenuItemComponent
              key={child.menu_id}
              menu={child}
              selectedMenus={selectedMenus}
              handleCheckboxChange={handleCheckboxChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuForm;
