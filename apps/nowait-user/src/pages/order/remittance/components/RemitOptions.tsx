import { useState } from "react";
import { useToastStore } from "../../../../stores/toastStore";
import useThrottle from "../../../../hooks/useThrottle";
import Help from "../../../../assets/icon/help.svg?react";
import KakaoPay from "../../../../assets/kakaoPay.svg?react";
import TossPay from "../../../../assets/tossPay.svg?react";
import NaverPay from "../../../../assets/naverPay.svg?react";
import RadioGroup from "./RadioGroup";
import Radio from "./Radio";

const RemitOptions = ({ totalPrice }: { totalPrice: number }) => {
  const { showToast } = useToastStore();
  const [remitDescriptionToggle, setRemitDescriptionToggle] = useState(false);
  const [remitValue, setRemitValue] = useState("kakao");
  const account = `IBK기업 611-000202-01-010 ${totalPrice}`;
  const clipBoardDelay = 2000;

  const handleCopyClipBoard = useThrottle(() => {
    navigator.clipboard.writeText(account);
    showToast("계좌번호가 복사되었습니다");
  }, clipBoardDelay);

  return (
    <section>
      <div className="py-7.5">
        <div className="mb-5">
          <h1 className="text-title-18-semibold mb-4">
            <button
              className="flex items-center gap-1"
              onClick={() => setRemitDescriptionToggle(!remitDescriptionToggle)}
            >
              송금 수단
              <span>
                <Help />
              </span>
            </button>
          </h1>
          {remitDescriptionToggle && (
            <h2 className="text-14-regular text-black-70">
              축제 부스는 한정된 시간과 인력으로 운영 돼요.
              <br />
              효율적인 운영과 정산을 위해 현재는 계좌 이체만 가능해요.
            </h2>
          )}
        </div>
        <div className="flex flex-col gap-3 rounded-2xl bg-[#F9F9F9] px-5 py-5">
          <RadioGroup label="간편 송금">
            <Radio
              logo={<KakaoPay />}
              name="remit"
              value="kakao"
              defaultChecked
              onChange={(e) => setRemitValue(e.target.value)}
            >
              카카오페이
            </Radio>
            <Radio
              logo={<TossPay />}
              name="remit"
              value="toss"
              onChange={(e) => setRemitValue(e.target.value)}
            >
              토스
            </Radio>
            <Radio
              logo={<NaverPay />}
              name="remit"
              value="naver"
              onChange={(e) => setRemitValue(e.target.value)}
            >
              네이버페이
            </Radio>
          </RadioGroup>
        </div>
        <div className="mt-4 rounded-2xl bg-[#F9F9F9] px-5 py-5">
          <Radio
            name="remit"
            value="direct"
            onChange={(e) => setRemitValue(e.target.value)}
          >
            계좌로 직접 이체하기
          </Radio>
          {remitValue === "direct" && (
            <>
              <p className="text-14-medium text-black-60 pt-2 pb-5">
                아래의 계좌로 직접 이체해주셔야 돼요
              </p>
              <div className="-mx-5 border border-[#F1F1F1]"></div>
              <div className="flex justify-between items-center pt-5">
                <div className="flex items-center gap-2">
                  <img
                    className="w-[38px] h-[38px] rounded-full"
                    src="/beef.png"
                  ></img>
                  <div>
                    <h1 className="text-14-semibold text-black-80">
                      노웨잇대학생회
                    </h1>
                    <h2 className="text-[12px] font-regular text-black-60">
                      {account}
                    </h2>
                  </div>
                </div>
                <button
                  className="text-12-semibold bg-white px-3 py-1.5 rounded-[50px]"
                  onClick={handleCopyClipBoard}
                >
                  복사
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default RemitOptions;
