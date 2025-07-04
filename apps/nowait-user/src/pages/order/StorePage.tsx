import { useLocation, useNavigate, useParams } from "react-router-dom";
import PageFooterButton from "../../components/order/PageFooterButton";
import { Button } from "@repo/ui";
import TotalButton from "../../components/order/TotalButton";
import { useCartStore } from "../../stores/cartStore";
import MenuList from "../../components/common/MenuList";
import { useEffect } from "react";
import { getMyOrderList } from "../../lib/order";
import { useToastStore } from "../../stores/toastStore";

const StorePage = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const tableId = localStorage.getItem("tableId");
  const location = useLocation();
  const added = (location.state as { added?: boolean } | null)?.added;
  const { cart } = useCartStore();
  const { showToast } = useToastStore();

  //메뉴 추가 시 toast 띄우기
  useEffect(() => {
    if (added) showToast("메뉴를 담았습니다");
    navigate(location.pathname, { replace: true });
  }, [added]);

  const getMyOrderListButton = async () => {
    try {
      const res = await getMyOrderList(storeId, tableId!);
      navigate(`/${storeId}/myOrderList`, { state: res });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto mt-7.5 px-5">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-headline-24-bold">스페이시스</h1>
            <h2 className="text-text-16-medium">5번 테이블</h2>
          </div>
          <button
            onClick={getMyOrderListButton}
            className="text-14-medium bg-black-20 py-2 px-2.5 rounded-[8px] text-black-70 cursor-pointer"
          >
            주문내역
          </button>
        </div>
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
