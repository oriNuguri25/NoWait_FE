import { useState } from "react";
import QuantitySelector from "../../../components/common/QuantitySelector";
import PageFooterButton from "../../../components/order/PageFooterButton";
import { Button } from "@repo/ui";
import { useNavigate } from "react-router-dom";

const WaitingPartySizeForm = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <div className="px-5 pt-[40px]">
        <h1 className="text-headline-24-bold mb-[50px]">
          대기 등록을 위해
          <br />
          인원 수를 입력해주세요
        </h1>
        <div className="w-full flex justify-between items-center">
          <h1 className="text-[24px] font-semibold">입장 인원</h1>
          <QuantitySelector
            mode="state"
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </div>
      </div>
      <PageFooterButton>
        <Button>다음</Button>
      </PageFooterButton>
    </div>
  );
};

export default WaitingPartySizeForm;
