import CartItem from "./components/CartItem";
import PageFooterButton from "../../../components/order/PageFooterButton";
import { Button } from "@repo/ui";
import { useNavigate, useParams } from "react-router-dom";
import TotalButton from "../../../components/order/TotalButton";
import { useCartStore } from "../../../stores/cartStore";
import { AnimatePresence } from "framer-motion";
import EmptyCart from "./components/EmptyCart";
import { SmallActionButton } from "../../../components/SmallActionButton";
import Add from "../../../assets/icon/Add.svg?react";
import BackHeader from "../../../components/BackHeader";

const OrderListPage = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const { cart } = useCartStore();
  console.log(cart,"카트")
  if (cart.length === 0) return <EmptyCart />;

  return (
    <div>
      <BackHeader title="장바구니"/>
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
                  originPrice={item.originPrice}
                  price={item.price}
                  quantity={item.quantity}
                />
              );
            })}
          </AnimatePresence>
          <SmallActionButton
            mode="default"
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
        <Button
          textColor="white"
          onClick={() => navigate(`/${storeId}/remittance`)}
        >
          <TotalButton variant="orderPage" actionText="주문하기" />
        </Button>
      </PageFooterButton>
    </div>
  );
};

export default OrderListPage;
