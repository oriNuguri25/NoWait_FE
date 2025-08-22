import { useNavigate, useParams } from "react-router-dom";

const StoreHeader = ({storeName}:{storeName:string | undefined}) => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const tableId = localStorage.getItem("tableId")
  return (
    <section className="flex justify-between items-start mb-7">
      <div className="max-w-[250px]">
        <h1 className="text-headline-24-bold mb-1.5">{storeName}일이삼사오육칠팔구십십일십이십삼</h1>
        <h2 className="text-16-medium text-black-70">{tableId}번 테이블</h2>
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
