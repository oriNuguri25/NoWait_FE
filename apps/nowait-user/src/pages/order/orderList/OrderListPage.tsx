import CartItem from "./components/CartItem";
import PageFooterButton from "../../../components/order/PageFooterButton";
import { Button } from "@repo/ui";
import { useNavigate, useParams } from "react-router-dom";
import TotalButton from "../../../components/order/TotalButton";
import { useCartStore } from "../../../stores/cartStore";
import { AnimatePresence } from "framer-motion";
import EmptyCart from "./components/EmptyCart";
import { getTableId, setSessionData } from "../../../utils/cartStorage";
import { SmallActionButton } from "../../../components/SmallActionButton";
import Add from "../../../assets/icon/Add.svg?react";
import { sumTotalPrice } from "../../../utils/sumUtils";
import { createOrder } from "../../../lib/order";

const OrderListPage = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const tableId = getTableId();
  const { cart } = useCartStore();

  const orderHandleButton = async () => {
    try {
      const payload = {
        depositorName: "홍길동",
        items: cart.map((item) => ({
          menuId: item.menuId,
          quantity: item.quantity,
        })),
        totalPrice: sumTotalPrice(cart),
      };
      const res = await createOrder(storeId!, tableId!, payload);
      if (res?.success) {
        //세션 아이디, 입금자명 로컬스토리지 저장
        setSessionData(res.response.sessionId, res.response.depositorName);
      } else {
        console.log("error");
      }
      navigate(`/${storeId}/payer`);
    } catch (e) {
      console.log(e);
    }
  };

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div>
      <section className="flex flex-col flex-grow min-h-screen-dvh pt-7 px-5 pb-[124px]">
        <h1 className="text-headline-24-bold mb-5">
          주문 총 <span className="text-primary">{cart.length}건</span>
        </h1>
        <ul className="flex justify-center flex-col">
          <AnimatePresence mode="sync">
            {cart.map((item) => {
              return (
                <CartItem
                  key={item.menuId}
                  id={item.menuId}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                />
              );
            })}
          </AnimatePresence>
          <SmallActionButton
            type="button"
            ariaLabel="메뉴 추가하기"
            onClick={() => navigate(`/${storeId}`)}
            className="py-5 border-none"
          >
            메뉴 추가하기
            <Add className="w-4 h-4 mb-1" fill="currentColor" />
          </SmallActionButton>
        </ul>
      </section>
      <PageFooterButton>
        <Button textColor="white" onClick={orderHandleButton}>
          <TotalButton variant="orderPage" actionText="이체하기" />
        </Button>
      </PageFooterButton>
    </div>
  );
};

export default OrderListPage;
