import PageFooterButton from "../../../components/order/PageFooterButton";
import { Button } from "@repo/ui";
import { useNavigate, useParams } from "react-router-dom";
import TotalButton from "../../../components/order/TotalButton";
import { useCartStore } from "../../../stores/cartStore";
import SectionDivider from "../../../components/SectionDivider";
import { useRef, useState } from "react";
import { sumTotalPrice } from "../../../utils/sumUtils";
import { getTableId, setSessionData } from "../../../utils/cartStorage";
import { createOrder } from "../../../lib/order";
import PayerInput from "./components/PayerInput";
import OrderSummary from "./components/OrderSummary";
import RemitOptions from "./components/RemitOptions";
import ConfirmModal from "../../../components/order/ConfirmModal";
import useModal from "../../../hooks/useModal";

const RemittancePage = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const tableId = getTableId();
  const modal = useModal();
  const { cart } = useCartStore();
  const [payer, setPayer] = useState("");
  const [payerError, setPayerError] = useState(false);
  const totalPrice = sumTotalPrice(cart);
  const payerFocus = useRef<HTMLInputElement>(null)

  const orderHandleButton = async () => {
    if (payer.trim() === "") {
      setPayerError(true);
      payerFocus?.current?.focus()
      return;
    }
    setPayerError(false);
    try {
      const payload = {
        depositorName: payer,
        items: cart.map((item) => ({
          menuId: item.menuId,
          quantity: item.quantity,
        })),
        totalPrice,
      };
      console.log(payload);
      const res = await createOrder(storeId!, tableId!, payload);
      if (res?.success) {
        //세션 아이디, 입금자명 로컬스토리지 저장
        setSessionData(res.response.sessionId, res.response.depositorName);
      } else {
        console.log("error");
      }
      modal.open()
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col flex-grow pb-[124px] min-h-screen-dvh">
      <div className="px-5">
        <OrderSummary cart={cart} />
        <SectionDivider />
        <PayerInput value={payer} setValue={setPayer} payerError={payerError} payerFocus={payerFocus}/>
        <SectionDivider />
        <RemitOptions totalPrice={totalPrice} />
        <SectionDivider />
        <section>
          <div className="flex justify-between items-center pt-6 pb-5.5">
            <h1 className="text-title-18-semibold text-black-90">결제 금액</h1>
            <h2 className="text-title-18-semibold text-primary">
              {totalPrice.toLocaleString()}원
            </h2>
          </div>
        </section>
      </div>
      <PageFooterButton>
        <Button textColor="white" onClick={orderHandleButton}>
          <TotalButton variant="orderPage" actionText="이체하기" />
        </Button>
      </PageFooterButton>
      {modal.isOpen && (
        <ConfirmModal
          open={() => navigate(`/${storeId}/remittanceWait`)}
          close={modal.close}
          title={`직접 이체하신 후, 이 화면으로\n다시 돌아와주세요`}
          description={`화면으로 다시 돌아와 주문 과정을 끝마치셔야\n주문이 접수 돼요.`}
          positiveButton="확인했어요"
          negativeButton="다시 선택할게요"
        />
      )}
    </div>
  );
};

export default RemittancePage;
