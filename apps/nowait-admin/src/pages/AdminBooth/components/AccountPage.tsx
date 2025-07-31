import { useState } from "react";
import banner from "../../../assets//booth/banner.svg";
import RedBadge from "../../../components/RedBadge";
import naverLogo from "../../../assets/booth/naverLogo.svg";
import kakaoLogo from "../../../assets/booth/kakaoLogo.svg";
import tossLogo from "../../../assets/booth/tossLogo.svg";

const AccountPage = () => {
  const [bank, setBank] = useState("IBK 기업");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const paymentOptions = [
    {
      id: "kakao",
      name: "카카오페이",
      logo: kakaoLogo,
      placeholder: "https://qr.kakaopay.com/",
    },
    {
      id: "toss",
      name: "토스",
      logo: tossLogo,
      placeholder: "supertoss://send",
    },
    {
      id: "naver",
      name: "네이버페이",
      logo: naverLogo,
      placeholder: "https://new-m.pay.naver.com/",
    },
  ];

  return (
    <div className="">
      {/* Guide Banner */}
      <div className="my-10">
        <img src={banner} />
      </div>

      {/* QR Code Section */}
      <section>
        <h2 className="flex items-center text-navy-80 text-18-bold gap-[6px]">
          간편 송금 QR코드 <RedBadge label="필수" small={true} />
        </h2>
        <p className="text-14-regular text-black-60 mt-[14px] mb-[30px]">
          카카오페이, 토스, 네이버페이에서 발급한 QR코드를 등록하면 사용자가
          계좌번호 입력 없이 바로 이체할 수 있어요
        </p>

        <div className="space-y-[20px] w-full">
          {paymentOptions.map((option) => (
            <div className="flex w-full items-center gap-[10px]">
              <div className="flex items-center gap-[8px] w-[130px]">
                <img
                  src={option.logo}
                  alt={option.name}
                  className="w-[38px] h-[38px] rounded-full"
                />
                <span className="text-14-semibold">{option.name}</span>
              </div>
              <div
                key={option.id}
                className="flex h-[52px] w-[474px] items-center bg-black-5 rounded-xl border border-[#dddddd] pl-4 pr-[10px] py-4"
              >
                <input
                  type="text"
                  placeholder={option.placeholder}
                  className="flex-1 bg-transparent outline-none text-sm text-gray-700"
                />
                <button className="text-black-80 text-12-bold bg-black-30 rounded-[6px] p-[10px] hover:bg-gray-300">
                  이미지로 업로드
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Account Section */}
      <section className="my-[60px]">
        <h2 className="text-navy-80 text-18-bold mb-[20px]">입금받을 계좌</h2>
        <div className="flex space-x-[10px]">
          <select
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            className="w-1/4 border border-[#dddddd] rounded-md p-4 text-black-70 text-14-regular rounded-xl"
          >
            <option>IBK 기업</option>
            <option>신한은행</option>
            <option>국민은행</option>
            <option>하나은행</option>
          </select>
          <input
            type="text"
            placeholder="예금주 이름"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="w-1/4 border border-[#dddddd] bg-black-5 text-black-90 rounded-xl p-4"
          />
          <input
            type="text"
            placeholder="계좌번호"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-1/2 border border-[#dddddd] bg-black-5 text-black-90 rounded-xl p-4"
          />
        </div>
      </section>

      <button className="w-full py-4 bg-black-25 text-black-55 rounded-[8px] text-14-semibold">
        저장하기
      </button>
    </div>
  );
};

export default AccountPage;
