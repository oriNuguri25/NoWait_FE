import BackArrowButton from "../../../assets/arrow_back.svg?react";
import { useState } from "react";
import Menu from "../../../assets/Menu.svg?react";
import { useNavigate } from "react-router-dom";
import { useWindowWidth } from "../../../hooks/useWindowWidth";

// 가이드 이미지들을 glob으로 import
const kakaoImages = import.meta.glob("../../../assets/guides/kakao/*.png", {
  eager: true,
});
const tossImages = import.meta.glob("../../../assets/guides/toss/*.png", {
  eager: true,
});
const naverImages = import.meta.glob("../../../assets/guides/naver/*.png", {
  eager: true,
});

// 가이드 데이터 정의
interface GuideStep {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  hasIcon?: boolean;
}

const guideData = {
  카카오페이: {
    frames: Object.values(kakaoImages).map(
      (module: any) => module.default
    ) as string[],
    steps: [
      {
        title: "1. 카카오톡 어플 실행 후, 더보기 메뉴에서 'QR' 아이콘 클릭",
        description:
          "카카오톡 어플 실행 후, '더보기' 메뉴를 선택해 주세요. 그 후 우측 상단의 QR 아이콘을 클릭해 주세요.",
      },
      {
        title: "2. '송금코드' 클릭",
        description: "우측 하단의 '송금코드'를 선택해 주세요.",
      },
      {
        title: "3. 송금 링크 복사",
        description:
          "복사한 링크를 입력칸에 붙여넣어주세요. QR이미지로 받은 경우, 이미지를 업로드 해주세요.",
      },
    ] as GuideStep[],
  },
  토스: {
    frames: Object.values(tossImages).map(
      (module: any) => module.default
    ) as string[],
    steps: [
      {
        title: "1. 토스 어플 실행",
        description:
          "토스 어플을 실행한 후, 하단 탭바에서 전체 메뉴를 클릭해 주세요.",
      },
      {
        title: "2. 검색창에 'QR코드 발급' 입력",
        description:
          "상단 검색창에서 'QR코드 발급'을 입력하여 해당 메뉴를 찾아주세요.",
      },
      {
        title: "3. 입금받을 계좌를 선택 후, QR코드 생성",
        description:
          "입금받을 계좌를 선택해 주세요. 하단에 'QR코드 받기'를 누르면 QR코드를 생성할 수 있어요.",
      },
      {
        title: "4. QR이미지 저장",
        description: "QR코드 발급이 완료되었어요. QR이미지를 저장해 주세요.",
      },
      {
        title: "5. QR이미지 업로드",
        description:
          "QR이미지를 업로드 해주세요. 링크의 경우, 복사하여 입력칸에 붙여넣어주세요.",
      },
    ] as GuideStep[],
  },
  네이버페이: {
    frames: Object.values(naverImages).map(
      (module: any) => module.default
    ) as string[],
    steps: [
      {
        title: "1. 네이버 어플 실행",
        description:
          "네이버 어플을 실행하고, 좌측 상단에 'Pay'를 클릭해 주세요.",
      },
      {
        title: (
          <>
            2. <Menu className="icon-m mx-1.25" /> 아이콘 클릭 후, '송금' 클릭
          </>
        ),
        description: (
          <>
            우측 상단에 <Menu className="icon-xs mx-0.75" /> 아이콘을 클릭하고,
            송금 카테고리에서 '송금'을 찾아주세요.
          </>
        ),
        hasIcon: true,
      },
      {
        title: "3. 'QR 보여주고 돈 받기' 클릭",
        description: "상단 우측에 있는 'QR 보여주고 돈 받기'를 클릭해 주세요.",
      },
      {
        title: "4. 계좌 정보 클릭",
        description: "계좌 정보를 눌러 원하는 계좌로 설정해 주세요.",
      },
      {
        title: "5. '다른 계좌로 QR 만들기' 클릭",
        description:
          "'다른 계좌로 QR 만들기'를 클릭하면 원하는 계좌로 QR코드를 생성할 수 있어요.",
      },
      {
        title: "6. 계좌 입력하여 QR코드 생성",
        description:
          "입금받을 계좌번호와 은행을 선택해 주세요. 하단에 'QR코드 만들기'를 누르면 QR코드를 생성할 수 있어요.",
      },
      {
        title: "7. '인쇄하기' 클릭 후, 이미지 저장",
        description:
          "QR코드 발급이 완료되었어요. '인쇄하기'를 누르고, 인쇄용 이미지를 저장해 주세요.",
      },
      {
        title: "8. QR이미지 업로드",
        description:
          "QR코드 발급이 완료되었어요. '인쇄하기'를 누르고, 인쇄용 이미지를 저장해 주세요.",
      },
    ] as GuideStep[],
  },
};

// 가이드 스텝 컴포넌트
const GuideStep = ({
  title,
  description,
  imageSrc,
}: {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  imageSrc: string;
  hasIcon?: boolean;
}) => (
  <div className="flex flex-col gap-5">
    <div className="flex text-title-18-bold text-navy-80">{title}</div>
    <div className="flex">
      <img src={imageSrc} alt="가이드" />
    </div>
    <div className="flex text-14-regular text-black-90 items-center">
      {description}
    </div>
  </div>
);

const QrGuides = () => {
  const [selectedPayment, setSelectedPayment] = useState<string>("카카오페이");
  const navigate = useNavigate();

  const windowWidth = useWindowWidth();
  const isMobile = windowWidth <= 450;

  const paymentOptions = ["카카오페이", "토스", "네이버페이"];

  const handleBackClick = () => {
    navigate("/admin/booth");
  };

  const currentGuide = guideData[selectedPayment as keyof typeof guideData];

  return (
    <div className="w-full min-h-screen bg-white">
      <div
        className={`w-full md:w-[752px] max-w-[804px] flex flex-col items-center mx-auto overflow-y-auto pt-5 pb-15 ${
          isMobile ? "px-5" : "px-[90px]"
        }`}
      >
        <div className="flex flex-col gap-12.5">
          <div className="flex">
            <BackArrowButton
              className="text-black-90 icon-m cursor-pointer"
              onClick={handleBackClick}
            />
          </div>

          {/* 페이 선택 버튼 */}
          <div className="flex flex-row gap-5 border-b border-b-black-20">
            {paymentOptions.map((payment) => (
              <div
                key={payment}
                className={`flex text-16-semibold leading-[150%] cursor-pointer pb-2 ${
                  selectedPayment === payment
                    ? "text-black-90 border-b-2 border-black-90"
                    : "text-black-60"
                }`}
                onClick={() => setSelectedPayment(payment)}
              >
                {payment}
              </div>
            ))}
          </div>

          {/* 가이드 내용 */}
          <div className="flex flex-col gap-12.5">
            {currentGuide.steps.map((step, index) => (
              <GuideStep
                key={index}
                title={step.title}
                description={step.description}
                imageSrc={currentGuide.frames[index]}
                hasIcon={step.hasIcon}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrGuides;
