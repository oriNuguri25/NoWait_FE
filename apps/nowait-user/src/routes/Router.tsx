import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import ReserveSuccessPage from "../pages/reserve/ReserveSuccessPage";
import MapPage from "../pages/reserve/MapPage";
import StoreDetailPage from "../pages/reserve/StoreDetailPage";
import RedirectToStorePage from "../pages/order/home/RedirectToStorePage";
import StorePage from "../pages/order/home/StorePage";
import OrderListPage from "../pages/order/orderList/OrderListPage";
import OrderSuccessPage from "../pages/order/orderSuccess/OrderSuccessPage";
import RemittancePage from "../pages/order/remittance/RemittancePage";
import StoreReservePage from "../pages/reserve/StoreReservePage";
import LoginPage from "../pages/login/LoginPage";
import KakaoRedirectHandler from "../pages/login/KakaoRedirectHandler";
import AuthGuard from "../components/AuthGuard";
import PageTransitionWrapper from "../components/layout/PageTransitionWrapper";
import AddMenuPage from "../pages/order/addMenu/AddMenuPage";
import RemittanceWaitPage from "../pages/order/remittenceWait/RemittanceWaitPage";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "../components/layout/transition.css";
import OrderDetailsPage from "../pages/order/orderDetails/OrderDetailsPage";

// AuthGuard로 래핑하는 헬퍼 함수
const withAuth = (Component: React.ComponentType) => (
  <AuthGuard>
    <Component />
  </AuthGuard>
);
const withTransition = (Component: React.ComponentType) => (
  <PageTransitionWrapper>
    <Component />
  </PageTransitionWrapper>
);
const Router = () => {
  const location = useLocation();
  return (
    // <PageTransitionWrapper>
      <Routes location={location}  key={location.pathname}>
        {/* 공개 라우트 - 인증 불필요 */}
        <Route path="/login/success" element={<KakaoRedirectHandler />} />
        <Route path="/login" element={<LoginPage />} />

        {/* 보호된 라우트 - 인증 필요 (구체적인 경로 먼저) */}
        <Route
          path="/store/:id/reserve/success"
          element={withAuth(ReserveSuccessPage)}
        />
        <Route path="/store/:id/reserve" element={withAuth(StoreReservePage)} />
        <Route path="/store/:id" element={withAuth(StoreDetailPage)} />
        <Route path="/map" element={withAuth(MapPage)} />
        <Route path="/" element={withAuth(HomePage)} />

        {/* QR 코드 접속 페이지 - 인증 불필요 (일반적인 경로 나중에) */}
        <Route path="/:storeId/:tableId" element={<RedirectToStorePage />} />

        <Route path="/:storeId" element={<StorePage />} />
        <Route path="/:storeId/menu/:menuId" element={<AddMenuPage />} />
        {/* <Route path="/:storeId" element={withTransition(StorePage)} />
        <Route
          path="/:storeId/menu/:menuId"
          element={withTransition(AddMenuPage)}
        /> */}
        <Route path="/:storeId/order" element={withTransition(OrderListPage)} />
        <Route
          path="/:storeId/remittance"
          element={withTransition(RemittancePage)}
        />
        <Route
          path="/:storeId/remittanceWait"
          element={withTransition(RemittanceWaitPage)}
        />
        <Route
          path="/:storeId/order/success"
          element={withTransition(OrderSuccessPage)}
        />
        <Route
          path="/:storeId/orderDetails"
          element={withTransition(OrderDetailsPage)}
        />
        {/* 보호된 라우트 - 인증 필요 */}
        <Route
          path="/*"
          element={
            <AuthGuard>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/store/:id" element={<StoreDetailPage />} />
                <Route
                  path="/store/:id/reserve"
                  element={<StoreReservePage />}
                />
                <Route
                  path="/store/:id/reserve/success"
                  element={<ReserveSuccessPage />}
                />
                <Route path="/map" element={<MapPage />} />
              </Routes>
            </AuthGuard>
          }
        />
      </Routes>
    // </PageTransitionWrapper>
  );
};

export default Router;
