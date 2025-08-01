import { useQuery } from "@tanstack/react-query";
import { getStore } from "../../../../api/reservation";
import { useNavigate } from "react-router-dom";
import {Button} from "@repo/ui"
import Clock from "../../../../assets/icon/clock.svg?react"

interface PropsType {
  storeId: string | undefined;
}

const BoothDetail = ({ storeId }: PropsType) => {
    console.log(storeId,"스토어 아이디")
  const navigate = useNavigate();

  const { data: store } = useQuery({
    queryKey: ["store", storeId],
    queryFn: () => getStore(storeId!),
    select: (data) => data.response,
  });
  return (
    <div className="fixed bottom-[30px] left-1/2 -translate-x-1/2 w-[calc(100%-32px)] bg-white rounded-[20px] z-30">
      <div className="pt-[20px] pb-[16px] px-[20px]">
        <div className="flex items-start justify-between">
          <div className="mb-[16px]">
            <h1 className="text-title-20-semibold text-black-90 mb-1">
              {store?.name}
            </h1>
            <h2 className="text-16-regular">{store?.departmentName}</h2>
          </div>
          {/* <BookmarkIcon /> */}
        </div>
        <p className="flex items-center text-16-regular text-black-80 mb-[20px]">
          <span className="w-[18px] flex justify-center mr-1.5">
            <Clock />
          </span>
          {store?.waitingCount === 0
            ? "대기없음"
            : `대기 ${store?.waitingCount}명`}
        </p>
        <Button onClick={() => navigate(`/store/${storeId}`)}>
          상세 보기
        </Button>
      </div>
    </div>
  );
};

export default BoothDetail;
