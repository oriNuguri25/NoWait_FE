import React, { useState } from "react";
import PageFooterButton from "../../components/order/PageFooterButton";
import { Button } from "@repo/ui";
import copy from "../../assets/icon/copy.svg";
import useThrottle from "../../hooks/useThrottle";
import Toast from "../../components/order/Toast";
import useModal from "../../hooks/useModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ConfirmModal from "../../components/order/ConfirmModal";

const RemittanceRequestPage = () => {
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();
  const { storeId } = useParams();
  const modal = useModal();
  const price = useLocation().state;
  const account = "기업은행 611-000202-01-010";
  const clipBoardDelay = 3000;

  const handleCopyClipBoard = useThrottle(() => {
    navigator.clipboard.writeText(account);
    setShowToast(true);
    setTimeout(() => setShowToast(false), clipBoardDelay);
  }, clipBoardDelay);

  return (
    <div>
      <div className="min-h-screen px-5 flex flex-col justify-center items-center">
        <div className="mb-6 text-center">
          <h1 className="text-headline-24-bold mb-2.5">
            주문을 위해 이체해 주세요
          </h1>
          <h2 className="text-text-16-regular text-black-70">
            아래 계좌로 결제를 완료해주세요.
            <br />
            입금 확인 후 주문이 확정됩니다.
          </h2>
        </div>
        <div className="flex flex-col justify-center items-center gap-3 rounded-2xl  bg-[#F2F6F9] px-[52px] py-[26px]">
          <h1 className="text-15-semibold text-navy-60">
            노웨잇대디자인과학생회
          </h1>
          <button onClick={handleCopyClipBoard} className="flex gap-1">
            <p className="inline text-16-medium underline text-navy-90">
              {account}
            </p>
            <img src={copy} alt="복사 아이콘" />
          </button>
          <p className="text-headline-24-bold">{price}원</p>
        </div>
      </div>
      <div className="fixed left-1/2 bottom-[124px] -translate-x-1/2 z-50">
        {showToast && <Toast message="계좌번호가 복사되었습니다" />}
      </div>
      {modal.isOpen && (
        <ConfirmModal
          open={() => navigate(`/${storeId}/payer`)}
          close={modal.close}
        />
      )}
      <PageFooterButton>
        <Button onClick={() => modal.open()}>다음</Button>
      </PageFooterButton>
    </div>
  );
};

export default RemittanceRequestPage;
