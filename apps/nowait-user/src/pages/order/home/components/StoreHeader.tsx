import { useNavigate, useParams } from "react-router-dom";
import { getOrderDetails } from "../../../../api/order";

const StoreHeader = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const tableId = localStorage.getItem("tableId");

  const getOrderDetailsButton = async () => {
    try {
      const res = await getOrderDetails(storeId, tableId!);
      navigate(`/${storeId}/orderDetails`);
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex justify-between items-start mb-7">
      <div>
        <h1 className="text-headline-24-bold mb-1.5">스페이시스</h1>
        <h2 className="text-text-16-medium">5번 테이블</h2>
      </div>
      <button
        onClick={getOrderDetailsButton}
        className="text-14-semibold bg-black-20 py-2 px-2.5 rounded-[8px] text-black-70 cursor-pointer"
      >
        주문내역
      </button>
    </section>
  );
};

export default StoreHeader;
