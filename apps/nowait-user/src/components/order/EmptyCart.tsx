import { useNavigate } from "react-router-dom";
import Add from "../../assets/icon/Add.svg?react";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-16-regular text-black-70 mb-5 text-center">
        아직 담긴 메뉴가 없어요.
        <br />
        마음에 드는 메뉴를 담아주세요!
      </h1>
      <button
        type="button"
        aria-label="메뉴 추가"
        className="flex justify-center items-center gap-1 py-2 px-4 rounded-[12px] border border-[#ececec] text-black-70"
        onClick={() => navigate("/:storeId")}
      >
        <span className="text-[14px] font-bold">추가하기</span>
        <Add className="w-4 h-4" fill="currentColor" />
      </button>
    </div>
  );
};

export default EmptyCart;
