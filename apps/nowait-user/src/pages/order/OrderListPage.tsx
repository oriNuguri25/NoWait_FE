import MenuItem from "../../components/order/MenuItem";
import PageFooterButton from "../../components/order/PageFooterButton";
import { Button } from "@repo/ui";
import { useNavigate } from "react-router-dom";
import TotalButton from "../../components/order/TotalButton";
import { useCartStore } from "../../stores/cartStore";

const OrderListPage = () => {
  const navigate = useNavigate();
  const orderHandleButton = () => {};
  const { cart } = useCartStore();

  return (
    <div>
      <div className="pt-8 pb-24 px-5">
        <h1 className="text-headline-24-bold mb-5">총 주문 3건</h1>
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
