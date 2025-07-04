import { useLocation, useNavigate, useParams } from "react-router-dom";
import PageFooterButton from "../../../components/order/PageFooterButton";
import { Button } from "@repo/ui";
import TotalButton from "../../../components/order/TotalButton";
import { useCartStore } from "../../../stores/cartStore";
import MenuList from "../../../components/common/MenuList";
import { useEffect } from "react";
import { useToastStore } from "../../../stores/toastStore";
import StoreHeader from "./components/StoreHeader";

const StorePage = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const location = useLocation();
  const added = (location.state as { added?: boolean } | null)?.added;
  const { cart } = useCartStore();
  const { showToast } = useToastStore();

  //메뉴 추가 시 toast 띄우기
  useEffect(() => {
    if (added) showToast("메뉴를 담았습니다");
    navigate(location.pathname, { replace: true });
  }, [added]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto mt-7.5 px-5">
        <StoreHeader />
        <MenuList mode="order" />
      </div>
      {cart && cart.length > 0 && (
        <PageFooterButton>
          <Button
            textColor="white"
            onClick={() => navigate(`/${storeId}/order`)}
          >
            <TotalButton actionText="주문하기" />
          </Button>
        </PageFooterButton>
      )}
    </div>
  );
};

export default StorePage;
