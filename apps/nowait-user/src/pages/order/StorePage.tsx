import { useNavigate, useParams } from "react-router-dom";
import type { MenuType } from "../../types/order/menu";
import PageFooterButton from "../../components/order/PageFooterButton";
import { Button } from "@repo/ui";
import TotalButton from "../../components/order/TotalButton";
import { useCartStore } from "../../stores/cartStore";
import MenuList from "../../components/MenuList";


const StorePage = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const { cart } = useCartStore();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto mt-7.5 px-5">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-headline-24-bold">스페이시스</h1>
            <h2 className="text-text-16-medium">5번 테이블</h2>
          </div>
          <button
            onClick={() => alert("주문 내역")}
            className="text-14-medium bg-black-20 py-2 px-2.5 rounded-[8px] text-black-70 cursor-pointer"
          >
            주문내역
          </button>
        </div>
        <MenuList />
      </div>
      {cart && cart.length > 0 && (
        <PageFooterButton>
          <Button textColor="white" onClick={() => navigate(`/${storeId}/order`)}>
            <TotalButton />
          </Button>
        </PageFooterButton>
      )}
    </div>
  );
};

export default StorePage;
