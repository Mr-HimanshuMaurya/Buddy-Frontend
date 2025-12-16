import { useRoutes } from "react-router-dom";
import PgDashboard from "../components/pgOwners/PgDasboard"
import PgLayout from "./PgLayout";
import PageNotFound from "../components/pgOwners/PageNotFound";

export const PgRoute = () => {
  const routes = [
     
    {
      path: "/",
      element: (
        <PgLayout>
          <PgDashboard />
        </PgLayout>
      ),
    },
   {
      path: "/*",
      element: <PageNotFound />,
    },
  ];
  return useRoutes(routes);
};
