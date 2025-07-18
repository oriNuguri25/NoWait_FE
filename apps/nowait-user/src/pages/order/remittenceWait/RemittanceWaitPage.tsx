import { useNavigate, useParams } from "react-router-dom";
import PageFooterButton from "../../../components/order/PageFooterButton";
import { Button } from "@repo/ui";

const RemittanceWaitPage = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 flex-col justify-center items-center text-center overflow-y-auto px-5">
        <img
          className="mb-2.5 w-[210px] h-[210px] bg-black-25"
          src=""
          alt="이체 대기중인 이미지"
        />
        <h1 className="text-headline-24-bold mb-2">
          아직 주문이 완료되지 않았어요
        </h1>
        <h2 className="whitespace-pre-line text-16-regular text-black-70 mb-3.5">
          이체를 완료하셨다면 버튼을 눌러주세요
        </h2>
      </div>

      <PageFooterButton>
        <Button
          textColor="white"
          onClick={() => navigate(`/${storeId}/order/success`)}
        >
          이체했어요
        </Button>
      </PageFooterButton>
    </div>
  );
};

export default RemittanceWaitPage;
