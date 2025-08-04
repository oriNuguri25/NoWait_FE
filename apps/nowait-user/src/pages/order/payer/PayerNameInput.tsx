import { useState } from "react";
import { Button } from "@repo/ui";
import PageFooterButton from "../../../components/order/PageFooterButton";
import { useNavigate, useParams } from "react-router-dom";
import useModal from "../../../hooks/useModal";
import ConfirmModal from "../../../components/order/ConfirmModal";
import { useCartStore } from "../../../stores/cartStore";
import { sumTotalPrice } from "../../../utils/sumUtils";

const PayerNameInput = () => {
  const [payer, setPayer] = useState("");
  const navigate = useNavigate();
  const modal = useModal();
  const { storeId } = useParams();
  const { cart } = useCartStore();

  return (
    <div className="flex flex-col h-screen">
      <section className="flex-1 flex flex-col justify-center items-center text-center px-5 overflow-hidden">
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
      </section>
      {modal.isOpen && (
        <ConfirmModal
          open={() =>
            navigate(`/${storeId}/remittance/request`, {
              state: sumTotalPrice(cart),
            })
          }
          close={modal.close}
          title="입금자명이 맞는지 확인해주세요"
          description={`입금자명이 정확하지 않다면 주문이\n정상적으로 접수되지 않을 수 있어요.`}
          positiveButton="확인했어요"
          negativeButton="다시 입력할게요"
        />
      )}
      <PageFooterButton>
        <Button
          onClick={() => modal.open()}
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
