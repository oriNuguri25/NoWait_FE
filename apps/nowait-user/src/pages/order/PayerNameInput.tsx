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
    <div className="flex flex-col h-[100dvh]">
      <div className="flex-1 flex flex-col justify-center items-center text-center px-5 overflow-hidden">
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
          className="w-full text-title-20-semibold border-2 border-[#ececec] rounded-[12px] placeholder-[#aaa] text-center p-5 outline-none text-black-90"
          placeholder="입금자명"
          value={payer}
          onChange={(e) => setPayer(e.target.value)}
        />
      </div>
      <PageFooterButton>
        <Button
          onClick={handlePayerSubmit}
          backgroundColor={
            payer.trim() === "" ? "var(--black-25)" : "var(--navy-100)"
          }
          textColor={payer.trim() === "" ? "var(--black-55)" : "white"}
          disabled={payer.trim() === ""}
        >
          다음
        </Button>
      </PageFooterButton>
    </div>
  );
};

export default PayerNameInput;
