import { Routes, Route } from "react-router";
import AdminLayout from "./layout/AdminLayout";
import AdminAnalytics from "./pages/AdminAnalytics/AdminAnalytics";
import AdminHome from "./pages/AdminHome/AdminHome";
import AdminOrders from "./pages/AdminOrders/AdminOrders";
import NotFound from "./pages/NotFound/NotFound";
import LoginPage from "./pages/LoingPage/LoginPage";
import AdminAuth from "./pages/AdminAuth/AdminAuth";

function App() {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          // <RequireAdminAuth>
          <AdminLayout />
          // </RequireAdminAuth>
        }
      >
        {/* 대기인원 */}
        <Route index element={<AdminHome />} />
        {/* 주문현황 */}
        <Route path="orders" element={<AdminOrders />} />
        {/* 관리 & 통계 페이지 */}
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/adminAuth" element={<AdminAuth />}>
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
