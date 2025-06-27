import { useState } from "react";
import { Button } from "@repo/ui";
import PageFooterButton from "../../components/order/PageFooterButton";
import { useNavigate, useParams } from "react-router-dom";

const PayerNameInput = () => {
  const [payer, setPayer] = useState("");
  const navigate = useNavigate();
  const { storeId } = useParams();

  const handlePayerSubmit = () => {
    navigate(`/${storeId}/order/success`);
  };
  
  return (
    <div className="min-h-screen">
      <div className="min-h-screen flex flex-col justify-center items-center text-center">
        <div className="mb-7.5">
          <h1 className="text-headline-24-bold mb-2.5">
            정확한 결제 확인을 위해
            <br />
            입금자명을 입력해주세요
          </h1>
          <h2 className="text-16-regular text-black-70">
            한 번만 입력하면 이후 주문에도 적용 돼요.
          </h2>
        </div>
        <input
          className="text-title-20-semibold border-2 border-[#ececec] rounded-[12px] placeholder-[#aaa] text-center p-5 outline-none text-black-90"
          placeholder="입금자명"
          value={payer}
          onChange={(e) => setPayer(e.target.value)}
        ></input>
      </div>
      <PageFooterButton>
        <Button
          textColor="white"
          onClick={handlePayerSubmit}
          disabled={payer.trim() === ""}
        >
          다음
        </Button>
      </PageFooterButton>
    </div>
  );
};

export default PayerNameInput;
