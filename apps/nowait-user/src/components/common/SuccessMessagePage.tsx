import PageFooterButton from "../order/PageFooterButton";
import { Button } from "@repo/ui";
import { SmallActionButton } from "../SmallActionButton";
import { useNavigate, useParams } from "react-router-dom";

interface PropsType {
  imageSrc: string;
  imageAlt: string;
  title: string;
  message: string;
  onClick: () => void;
  buttonText: string;
}

const SuccessMessagePage = ({
  imageSrc,
  imageAlt,
  title,
  message,
  onClick,
  buttonText,
}: PropsType) => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 flex-col justify-center items-center text-center overflow-y-auto px-5">
        <img
          className="mb-5"
          src={imageSrc}
          alt={imageAlt}
        />
        <h1 className="text-headline-24-bold mb-2">{title}</h1>
        <h2 className="whitespace-pre-line text-16-regular text-black-70 mb-3.5">
          {message}
        </h2>
        {storeId && (
          <SmallActionButton
            type="button"
            ariaLabel="주문내역 확인"
            onClick={() => navigate(`/${storeId}`)} //주문 내역 페이지로 변경하기
          >
            주문내역 확인
          </SmallActionButton>
        )}
      </div>

      <PageFooterButton>
        <Button textColor="white" onClick={onClick}>
          {buttonText}
        </Button>
      </PageFooterButton>
    </div>
  );
};

export default SuccessMessagePage;
