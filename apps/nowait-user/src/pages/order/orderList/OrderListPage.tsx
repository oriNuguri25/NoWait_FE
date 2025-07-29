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
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStoreMenus } from "../../../api/menu";
import { getSoldOutMenusInCart } from "../../../utils/checkSoldOutMenus";

const OrderListPage = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const { cart, removeFromCart } = useCartStore();
  const [checked, setChecked] = useState<any>();

  const { data: menus } = useQuery({
    queryKey: ["storeMenus", storeId],
    queryFn: () => getStoreMenus(storeId),
    select: (data) => data.response.menuReadDto,
  });

  // 장바구니와 최신 메뉴 데이터 동기화, 현재 alert로 사용자에게 보여줌.(변경예정)
  useEffect(() => {
    if (!menus) return;
    const soldOutMenus = getSoldOutMenusInCart(cart, menus);
    if (soldOutMenus.length > 0) {
      alert(
        `현재 ${soldOutMenus.map((menu) => menu.name)}이 품절 상태 입니다.`
      );
      // 장바구니에서 품절된 메뉴 삭제
      for (let index = 0; index < soldOutMenus.length; index++) {
        removeFromCart(soldOutMenus[index].menuId);
      }
      navigate(-1);
      setChecked(soldOutMenus);
    }
  }, [menus, cart]);

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div>
      <BackHeader title="장바구니" />
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
