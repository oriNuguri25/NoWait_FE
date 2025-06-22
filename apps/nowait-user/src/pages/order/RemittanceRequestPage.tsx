import React from "react";
import PageFooterButton from "../../components/order/PageFooterButton";
import copy from "../../assets/icon/copy.svg";

const RemittanceRequestPage = () => {
  const account = "기업은행 611-000202-01-010";
  const handleCopyClipBoard = async (account: string) => {
    try {
      await navigator.clipboard.writeText(account);
      alert("복사가 완료되었습니다.")
    } catch (e) {}
  };
  return (
    <div className="flex min-h-full">
      <div className="flex-1 flex flex-col justify-center items-center">
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
          <button
            onClick={() => handleCopyClipBoard(account)}
            className="flex gap-1"
          >
            <p className="inline text-16-medium underline text-navy-90">
              {account}
            </p>
            <img src={copy} alt="복사 아이콘" />
          </button>
          <p className="text-headline-24-bold">23,800원</p>
        </div>
      </div>
      <PageFooterButton
        onClick={() => alert("클릭 시 주문 완료 페이지로 이동(confirm 이후)")}
      >
        입금 완료
      </PageFooterButton>
    </div>
  );
};

export default RemittanceRequestPage;
