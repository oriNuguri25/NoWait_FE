import Logo from "../../assets/logo.svg?react";
import LoginButton from "./LoginButton";
import LoginImage_1 from "../../assets/login/login_img_1.png";
import LoginImage_2 from "../../assets/login/login_img_2.svg?react";
import LoginImage_3 from "../../assets/login/login_img_3.svg?react";

const LoginPage = () => {
  return (
    <div className="flex flex-col px-6">
      <div className="mt-15 flex justify-start">
        <Logo className="w-14.5 h-6" />
      </div>
      <div className="mt-3 text-start">
        <text className="text-headline-28-bold text-black-100">
          기다림 없는
          <br />
          우리의 즐거운 축제
        </text>
      </div>
      <div className="mt-16 mx-[-24px] flex justify-center">
        <div className="w-[432px] aspect-square flex-shrink-0 flex items-center justify-center">
          <img src={LoginImage_1} alt="login_img_1" className="w-full" />
        </div>
      </div>

      <div className="mt-20">
        <div className="flex justify-start">
          <div className="bg-[#FFECE6] rounded-lg px-2.5 py-1.25 text-14-semibold text-primary h-8">
            웨이팅
          </div>
        </div>
        <div className="mt-3 text-start text-headline-24-bold text-black-100 justify-center">
          줄 서지 않고
          <br />
          간편하게 입장해요
        </div>
        <div className="mt-3 text-start text-16-regular text-black-70">
          현장에서 기다릴 필요 없이 모바일로 예약해
          <br />
          순서가 되면 빠르게 입장할 수 있어요.
        </div>
        <div className="mt-9.5 w-[325px] h-[210px] flex justify-center items-center">
          <LoginImage_2 />
        </div>
      </div>

      <div className="mt-22.5">
        <div className="flex justify-end">
          <div className="bg-[#FFECE6] rounded-lg px-2.5 py-1.25 text-14-semibold text-primary h-8 flex items-center justify-center">
            주문
          </div>
        </div>
        <div className="mt-3 text-end text-headline-24-bold text-black-100 justify-center">
          앉은 자리에서 바로
          <br />
          주문하고 결제까지
        </div>
        <div className="mt-3 text-end text-16-regular text-black-70">
          QR코드로 메뉴를 확인하고, 주문을 완료하면
          <br />
          계좌번호가 안내되어 손쉽게 결제할 수 있어요.
        </div>
        <div className="flex w-full justify-end items-center">
          <div className="mt-9.5 w-[325px] h-[210px] flex justify-end items-center">
            <LoginImage_3 />
          </div>
        </div>
      </div>

      <div className="mt-22.5">
        <div className="flex justify-start">
          <div className="bg-[#FFECE6] rounded-lg px-2.5 py-1.25 text-14-semibold text-primary h-8">
            축제 앱
          </div>
        </div>
        <div className="mt-3 text-start text-headline-24-bold text-black-100 justify-center">
          축제 부스를
          <br />
          한눈에!
        </div>
        <div className="mt-3 text-start text-16-regular text-black-70">
          앱에서 위치, 메뉴, 가격까지 한 번에 확인해
          <br />
          혼잡한 동선 없이 원하는 부스를 바로 찾아가요.
        </div>
        <div className="mt-9.5 w-full h-52.5 bg-gray-200 justify-center items-center mb-10">
          <span className="text-gray-500"></span>
        </div>
      </div>
      <LoginButton />
    </div>
  );
};

export default LoginPage;
