import { useNavigate, useParams } from "react-router-dom";
import Add from "../../../../assets/icon/Add.svg?react";
import { SmallActionButton } from "../../../../components/SmallActionButton";

const EmptyCart = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-16-regular text-black-70 mb-5 text-center">
        아직 담긴 메뉴가 없어요.
        <br />
        마음에 드는 메뉴를 담아주세요!
      </h1>
      <SmallActionButton
        type="button"
        ariaLabel="메뉴 추가"
        onClick={() => navigate(`/${storeId}`)}
      >
        추가하기
        <Add className="w-4 h-4" fill="currentColor" />
      </SmallActionButton>
    </div>
  );
};

export default EmptyCart;
