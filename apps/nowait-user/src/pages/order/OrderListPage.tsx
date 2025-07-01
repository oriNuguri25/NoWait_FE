import MenuItem from "../../components/order/MenuItem";
import PageFooterButton from "../../components/order/PageFooterButton";
import { Button } from "@repo/ui";
import { useNavigate, useParams } from "react-router-dom";
import TotalButton from "../../components/order/TotalButton";
import { useCartStore } from "../../stores/cartStore";
import { AnimatePresence } from "framer-motion";
import EmptyCart from "../../components/order/EmptyCart";
import { sumTotalPrice } from "../../utils/sumUtils";
import axios from "axios";
import { getTableId } from "../../utils/cartStorage";


const OrderListPage = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  console.log(storeId);
  const tableId = getTableId();
  console.log(tableId, "테이블아이디");
  const { cart } = useCartStore();

  const SERVER_URI = import.meta.env.VITE_SERVER_URI;

  const orderHandleButton = async () => {
    try {
      const payload = {
        tableId: Number(tableId),
        items: cart.map((item) => ({
          menuId: Number(item.id),
          quantity: item.quantity,
        })),
      };
      const url = `${SERVER_URI}/orders/create/${Number(storeId)}/${Number(tableId)}`;
      console.log("요청 주소:", url);
      await axios.post(url, payload);
      navigate(`/${storeId}/remittance/request`, {
        state: sumTotalPrice(cart),
      });
    } catch (e) {
      console.log(e);
    }
  };

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <div className="flex-1 overflow-y-auto pt-7 px-5">
        <h1 className="text-headline-24-bold mb-5">총 주문 {cart.length}건</h1>
        <ul>
          <AnimatePresence mode="sync">
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
          </AnimatePresence>
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
