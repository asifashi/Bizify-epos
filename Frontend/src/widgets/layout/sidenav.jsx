import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { useState } from "react";

export function Sidenav({ brandImg, brandName, routes }) {

  const [openMenus, setOpenMenus] = useState({});


  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };

  const handleDropdownToggle = (name) => {
    setOpenMenus((prev) => {
      const updatedMenus = {};
      Object.keys(prev).forEach((menuName) => {
        updatedMenus[menuName] = false;
      });
      updatedMenus[name] = !prev[name];
      return updatedMenus;
    });
  };
  const filteredRoutes = routes.map((section) => {
    if (section.title === "auth pages") {
      return { ...section, pages: [] };
    }
    return section;
  });

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 overflow-y-auto h-full w-60    transition-transform duration-200 xl:translate-x-0`}
    >
      <div
        className={`relative border-b ${
          sidenavType === "dark"
            ? "border-white/20 -mt-7"
            : "border-blue-gray-50"
        }`}
      >
        <Link
          to="/dashboard/home"
          className="flex items-center gap-3 py-4 px-8"
        >
          <Avatar
            className="mt-4"
            src={brandImg}
            size="sm"
          />
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
            className="pt-4"
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon
            strokeWidth={2.5}
            className="h-5 w-5 text-white"
          />
        </IconButton>
      </div>

      <div className="m-4 -mt-2">
        {filteredRoutes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title === "auth pages" ? null : (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={
                    sidenavType === "dark" ? "white" : "blue-gray"
                  }
                  className="font-black uppercase text-xs opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path, subpages }) => (
              <li key={name}>
                {subpages ? (
  <div>
    <Button
      variant="text"
      color={sidenavType === "dark" ? "white" : "blue-gray"}
      onClick={() => handleDropdownToggle(name)}
      className="flex items-center gap-4 px-4 capitalize"
      fullWidth
    >
      {icon}
      <Typography
        color="inherit"
        className="font-medium capitalize"
      >
        <span className="flex text-xs">
          {name}
          {openMenus[name] && (
            <span className="pl-3 pt-1">
              <ChevronDownIcon
                strokeWidth={2}
                className="h-3 w-5"
              />
            </span>
          )}
        </span>
      </Typography>
    </Button>
    {openMenus[name] && (
      <div className="pl-9">
        {subpages.map(({ name: subName, path: subPath }) => (
          <NavLink key={subName} to={`/${layout}${subPath}`}>
            {({ isActive }) => (
              <Button
                variant={isActive ? "gradient" : "text"}
                color={
                  isActive
                    ? sidenavColor
                    : sidenavType === "dark"
                    ? "white"
                    : "blue-gray"
                }
                className="flex items-center font-normal text-gray-100 gap-4 px-4 capitalize"
                fullWidth
              >
                {subName}
              </Button>
            )}
          </NavLink>
        ))}
      </div>
    )}
  </div>
                ) : (
                  <NavLink to={`/${layout}${path}`}>
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "gradient" : "text"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="flex items-center gap-4 px-4 capitalize"
                        fullWidth
                      >
                        {icon}
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          <span className="flex text-xs">{name}</span>
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/Logo_1.png",
  brandName: "Bizifyerp",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidenav.jsx";

export default Sidenav;
