import { Button } from "@repo/ui";
import kakao from "../../assets/KaKaoLogo.png";

const LoginButton = () => {
  return (
    <div className="pt-8 py-6.25 flex justify-center items-center sticky bottom-0">
      <Button
        buttonType="big"
        backgroundColor="#FEE500"
        textColor="#262200"
        onClick={() => {}}
        className="text-title-18-semibold"
      >
        <img src={kakao} alt="kakao" className="w-4 h-4 mr-0.25" />
        카카오톡으로 시작하기
      </Button>
    </div>
  );
};

export default LoginButton;
