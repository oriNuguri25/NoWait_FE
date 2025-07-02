import { sumQuantity, sumTotalPrice } from "../../utils/sumUtils";
import { useCartStore } from "../../stores/cartStore";

interface PropsType {
  variant?: "default" | "orderPage";
  actionText: string;
}

const TotalButton = ({ variant = "default", actionText }: PropsType) => {
  const { cart } = useCartStore();

  return (
    <>
      {variant !== "orderPage" && (
        <span className="text-[14px] font-extrabold rounded-[5px] px-1.5 bg-white text-black">{`${sumQuantity(
          cart,
          "quantity"
        )}`}</span>
      )}
      {`${sumTotalPrice(cart)}원 ${actionText}`}
    </>
  );
};

export default TotalButton;
