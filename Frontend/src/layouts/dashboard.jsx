import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import Modal from "@/widgets/Dropdown/Group";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    
    <div className="min-h-screen bg-gray-100">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/a.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className=" xl:ml-60">
        <DashboardNavbar />
    
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
       
        <Routes>
  {routes.map(({ layout, pages }) => {
    if (layout === "dashboard") {
      return pages.map(({ path, element, subpages }) => {
        if (subpages) {
          return (
            <Route key={path} path={path} element={element}>
              {subpages.map(({ name: subName, path: subPath, element: subElement }) => (
                <Route key={subName} path={subPath} element={subElement} />
              ))}
            </Route>
          );
        } else {
          return <Route key={path} path={path} element={element} />;
        }
      });
    }
  })}
</Routes>

        <div className="text-blue-gray-600 ">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
