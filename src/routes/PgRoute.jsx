import { useRoutes } from "react-router-dom";
import PgDashboard from "../components/pgOwners/PgDasboard"
import MainLayout from "./Mainlayout";
import PageNotFound from "../Components/PageNotFound/PageNotFound";

export const AppRoute = () => {
  const routes = [
     
    {
      path: "/",
      element: (
        <MainLayout>
          <PgDashboard />
        </MainLayout>
      ),
    },
   {
      path: "/*",
      element: <PageNotFound />,
    },
  ];
  return useRoutes(routes);
};
