import { sumQuantity, sumTotalPrice } from "../../utils/sumUtils";
import { useCartStore } from "../../stores/cartStore";
import NumberFlow from "@number-flow/react";

interface PropsType {
  variant?: "default" | "orderPage";
  actionText: string;
}

const TotalButton = ({ variant = "default", actionText }: PropsType) => {
  const { cart } = useCartStore();
  const totalPrice = sumTotalPrice(cart);

  return (
    <div className="flex items-center gap-2 text-[17px] font-semibold ml-1">
      {variant !== "orderPage" && (
        <span className="text-[14px] font-extrabold rounded-[5px] px-1.5 bg-white text-black">
          {sumQuantity(cart, "quantity")}
        </span>
      )}
      <NumberFlow value={totalPrice} suffix={`원 ${actionText}`} />
    </div>
  );
};

export default TotalButton;
