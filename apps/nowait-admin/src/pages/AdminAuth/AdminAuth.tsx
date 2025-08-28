import { Button } from "@repo/ui/button";
import RedBadge from "../../components/RedBadge";
import blackLogo from "../../assets/blackLogo.svg";
import { useNavigate } from "react-router";
import bg_festival from "../../assets/startPage/bg_festival.svg";
import bg_order from "../../assets/startPage/bg_order.svg";
import bg_status from "../../assets/startPage/bg_status.svg";
import bg_waiting from "../../assets/startPage/bg_waiting.svg";

const AdminAuth = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      {/* 1. Hero Section */}
      <section className="w-[576px] [@media(max-width:431px)]:w-[325px] text-left mx-auto mt-[50px] ">
        <div>
          <img src={blackLogo} />
        </div>
        <h2 className="text-3xl font-bold leading-snug mt-4">
          기다림 없는 <br /> 우리의 즐거운 축제
        </h2>
        <div className="mt-[44px] mb-[118.44px] flex justify-center items-center max-w-[498.91px] max-h-[394.56px] bg-transparent rounded-lg [@media(max-width:431px)]:w-[325px] [@media(max-width:431px)]:h-[325px]">
          <img src={bg_festival} className="w-full h-full object-cover" />
        </div>
      </section>

      {/* 2. Feature Section 1 */}
      <section className="w-[576px] [@media(max-width:431px)]:w-[325px] mx-auto ">
        <RedBadge label="웨이팅 관리" small={false} changeColor={true} />
        <h3 className="text-headline-28-bold mb-3 mt-3">
          대기 없이 빠르게
          <br />
          입장 안내해요
        </h3>
        <p className="text-16-regular text-black-70">
          등록된 대기 팀 정보를 실시간으로 확인하고,
          <br />
          간편하게 입장 처리를 할 수 있어요.
        </p>
        <div className="mt-[38px] mb-[83px] w-[325px] h-[210px] w-60 bg-transparent rounded-lg [@media(max-width:431px)]:w-[325px]">
          <img src={bg_waiting} className="w-full h-full object-cover" />
        </div>
      </section>

      {/* 3. Feature Section 2 */}
      <section className="w-[576px] [@media(max-width:431px)]:w-[325px] mx-auto text-right">
        <RedBadge label="주문 관리" small={false} changeColor={true} />
        <h3 className="text-headline-28-bold mb-3 mt-3">
          주문 접수, 입금 확인도
          <br />
          간편하게 확인해요
        </h3>
        <p className="text-16-regular text-black-70">
          주문이 들어오면 리스트로 자동 표시되고,
          <br />
          입금 여부만 확인하면 주문 처리가 끝나요.
        </p>
        <div className="mt-[38px] mb-[96px] ml-auto w-[325px] h-[210px] bg-transparent rounded-lg [@media(max-width:431px)]:w-[325px]">
          <img src={bg_order} className="h-full w-full object-cover" />
        </div>
      </section>

      {/* 4. Feature Section 3 */}
      <section className="w-[576px]  [@media(max-width:431px)]:w-[325px] mx-auto mb-[200px]">
        <RedBadge label="운영 현황 요약" small={false} changeColor={true} />
        <h3 className="text-headline-28-bold mb-3 mt-3">
          운영 상황을 한눈에
          <br />
          정리해드려요
        </h3>
        <p className="text-16-regular text-black-70">
          대기 팀 수, 주문 현황, 처리 건수까지
          <br />
          현재 진행 상황을 실시간 확인할 수 있어요.
        </p>
        <div className="mt-[38px] mb-[75px] w-[325px] h-[210px] bg-transparent rounded-lg [@media(max-width:431px)]:w-[325px]">
          <img src={bg_status} className="w-full h-full object-cover" />
        </div>
      </section>

      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[576px] 
  [@media(max-width:431px)]:bottom-[60px] 
  [@media(max-width:431px)]:mb-0 
  [@media(max-width:431px)]:w-[325px] rounded-[12px]"
      >
        <Button
          buttonType="big"
          className="text-15-semibold"
          onClick={() => navigate("login")}
        >
          계정으로 시작하기
        </Button>
      </div>
    </div>
  );
};

export default AdminAuth;
