import { useLocation } from "react-router-dom";
import BackHeader from "../../../components/BackHeader";

const StoreNoticePage = () => {
  const location = useLocation();
  const { notice } = location.state;
  return (
    <div>
      <div className="px-5">
        <BackHeader title="공지사항" />
        <section className="py-[30px]">
          <h1>입장 시 신분증 검사 필수</h1>
          <p>{notice}</p>
        </section>
      </div>
    </div>
  );
};

export default StoreNoticePage;
