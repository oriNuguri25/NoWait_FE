import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@repo/ui";
import { createReservation } from "../../../lib/reservation";
import PageFooterButton from "../../../components/order/PageFooterButton";

const WaitingSummaryPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const partySize = location.state as number;

  const handleSubmitReservation = async () => {
    try {
      const payload = {
        partySize,
      };
      await createReservation(id!, payload);
      navigate(`/store/${id}/waiting/success`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="px-5 pt-[40px]">
        <h1 className="text-headline-24-bold mb-[40px]">
          현재 <span className="text-primary">15</span>팀이
          <br />
          대기하고 있어요
        </h1>
        <div className="p-5.5 rounded-[16px] bg-black-10">
          <div className="flex justify-between items-center mb-2.5">
            <p className="text-16-semibold text-black-50">부스</p>
            <p className="text-16-medium text-black-90">
              스페이시스 / 컴퓨터공학과
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-16-semibold text-black-50">입장 인원</p>
            <p className="text-16-medium text-black-90">{partySize}명</p>
          </div>
        </div>
      </div>
      <PageFooterButton>
        <Button onClick={handleSubmitReservation}>등록하기</Button>
      </PageFooterButton>
    </div>
  );
};

export default WaitingSummaryPage;
