import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AdminLayout from "./layout/AdminLayout";
import AdminAnalytics from "./pages/AdminAnalytics/AdminAnalytics";
import AdminHome from "./pages/AdminHome/AdminHome";
import AdminOrders from "./pages/AdminOrders/AdminOrders";
import NotFound from "./pages/NotFound/NotFound";
import LoginPage from "./pages/LoingPage/LoginPage";
import AdminAuth from "./pages/AdminAuth/AdminAuth";
import AdminBooth from "./pages/AdminBooth/AdminBooth";
import QrGuides from "./pages/AdminBooth/components/QrGuides";
import RequireAdminAuth from "./components/RequireAdminAuth";

const router = createBrowserRouter([
  {
    element: <RequireAdminAuth />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminHome /> },
          { path: "booth", element: <AdminBooth /> },
          { path: "booth/guides", element: <QrGuides /> },
          { path: "orders/:storeId", element: <AdminOrders /> },
          { path: "analytics", element: <AdminAnalytics /> },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
  { path: "/", element: <AdminAuth /> },
  { path: "/login", element: <LoginPage /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
