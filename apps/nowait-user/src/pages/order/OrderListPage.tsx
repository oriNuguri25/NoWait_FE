import MenuItem from "../../components/order/MenuItem";
import PageFooterButton from "../../components/order/PageFooterButton";
import { Button } from "@repo/ui";
import { useNavigate } from "react-router-dom";
import TotalButton from "../../components/order/TotalButton";
import { useCartStore } from "../../stores/cartStore";
import Add from "../../assets/icon/Add.svg?react";
import EmptyCart from "../../components/order/EmptyCart";
import { sumTotalPrice } from "../../utils/sumUtils";

const OrderListPage = () => {
  const navigate = useNavigate();

  const { cart } = useCartStore();

  const orderHandleButton = () => {
    navigate("/:storeId/remittance/request", { state: sumTotalPrice(cart) });
  };

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div>
      <div className="h-[calc(100%-124px)] pt-7 px-5">
        <h1 className="text-headline-24-bold mb-5">총 주문 {cart.length}건</h1>
        <ul>
          {cart.map((item) => {
            return (
              <MenuItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
              />
            );
          })}
        </ul>
      </div>
      <PageFooterButton>
        <Button textColor="white" onClick={orderHandleButton}>
          <TotalButton />
        </Button>
      </PageFooterButton>
    </div>
  );
};

export default OrderListPage;
