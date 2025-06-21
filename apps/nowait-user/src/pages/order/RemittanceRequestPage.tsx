import React from "react";

const RemittanceRequestPage = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="mb-6 text-center">
          <h1 className="mb-2">입금 대기 중</h1>
          <h2>
            아래 계좌로 결제를 완료해주세요.
            <br />
            입금 확인 후 주문이 확정됩니다.
          </h2>
        </div>
        <div className="flex flex-col justify-center items-center gap-3 rounded-2xl  bg-[#F2F6F9] px-[52px] py-[26px]">
          <h1>노웨잇대디자인과학생회</h1>
          <p>기업은행 611-000202-01-010</p>
          <p>23,800원</p>
        </div>
      </div>
      <button
        className="w-full"
        onClick={() => alert("클릭 시 주문 완료 페이지로 이동(confirm 이후)")}
      >
        입금 완료
      </button>
    </div>
  );
};

export default RemittanceRequestPage;
