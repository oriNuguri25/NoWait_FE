import { sumQuantity, sumTotalPrice } from "../../utils/sumUtils";
import { useCartStore } from "../../stores/cartStore";
import { useLocation, useParams } from "react-router-dom";

const TotalButton = () => {
  const { cart } = useCartStore();
  const { storeId } = useParams();
  const pathname = useLocation().pathname;

  return (
    <>
      {pathname !== `/${storeId}/order` && (
        <span className="text-[14px] font-extrabold rounded-[5px] px-1.5 bg-white text-black">{`${sumQuantity(
          cart,
          "quantity"
        )}`}</span>
      )}
      {`${sumTotalPrice(cart)}원 주문하기`}
    </>
  );
};

export default TotalButton;
