import { useLocation, useNavigate, useParams } from "react-router-dom";
import SuccessMessagePage from "../../../components/common/SuccessMessagePage";
import OrderSuccess from "../../../assets/orderSuccess.webp";
import { useEffect } from "react";

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const { storeId } = useParams();
  console.log(location)

  useEffect(() => {
    // 이미 /d인데, 히스토리에 C가 남아있는 경우 replace 실행
    if (location.key) {
      navigate("/d", { replace: true });
    }
  }, [navigate, location]);

  return (
    <SuccessMessagePage
      imageSrc={OrderSuccess}
      imageAlt="주문 완료 이미지"
      title="주문이 접수되었어요!"
      message={`입금 확인 후 조리를 진행할게요.\n조금만 기다려 주세요.`}
      onClick={() => navigate(`/${storeId}`, { replace: true })}
      buttonText="확인"
    />
  );
};

export default OrderSuccessPage;
