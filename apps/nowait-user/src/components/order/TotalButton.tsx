import { sumQuantity, sumTotalPrice } from "../../utils/sumUtils";
import { useCartStore } from "../../stores/cartStore";
import CountUp from "react-countup";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

interface PropsType {
  variant?: "default" | "orderPage";
  actionText: string;
}

const TotalButton = ({ variant = "default", actionText }: PropsType) => {
  const { cart } = useCartStore();
  const location = useLocation();
  const added = (location.state as { added?: boolean } | null)?.added;
  const totalPrice = sumTotalPrice(cart);
  const prevPrice = useRef(0);
  const [currentPrice, setCurrentPrice] = useState(totalPrice);

  useEffect(() => {
    if (added) {
      setCurrentPrice(0);
      return;
    }
    setCurrentPrice((prev) => {
      prevPrice.current = prev;
      return totalPrice;
    });
  }, [totalPrice]);

  return (
    <>
      {variant !== "orderPage" && (
        <span className="text-[14px] font-extrabold rounded-[5px] px-1.5 bg-white text-black">
          {sumQuantity(cart, "quantity")}
        </span>
      )}

      <CountUp
        start={added ? currentPrice : prevPrice.current}
        end={totalPrice}
        duration={0.6}
        separator=","
        suffix="원"
      />

      {`${actionText}`}
    </>
  );
};

export default TotalButton;
