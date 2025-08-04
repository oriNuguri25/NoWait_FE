import { useNavigate, useParams } from "react-router-dom";

const StoreHeader = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();

  return (
    <section className="flex justify-between items-start mb-7">
      <div>
        <h1 className="text-headline-24-bold mb-1.5">스페이시스</h1>
        <h2 className="text-text-16-medium">5번 테이블</h2>
      </div>
      <button
        onClick={() => navigate(`/${storeId}/orderDetails`)}
        className="text-14-semibold bg-black-20 py-2 px-2.5 rounded-[8px] text-black-70 cursor-pointer"
      >
        주문내역
      </button>
    </section>
  );
};

export default StoreHeader;
