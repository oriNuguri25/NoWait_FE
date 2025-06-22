import { WaitingCard } from "./components/WaitingCard";

const AdminHome = () => {
  const handleCall = () => alert("🔔 고객 호출");
  const handleEnter = () => alert("🏢 고객 입장 처리");
  const handleClose = () => alert("❌ 카드 닫기");
  return (
    <div>
      <WaitingCard
        number={1}
        time="오후 7:49"
        waitMinutes={3}
        peopleCount={3}
        name="김노웻"
        phone="010-9986-4830"
        onCall={handleCall}
        onEnter={handleEnter}
        onClose={handleClose}
      />
    </div>
  );
};

export default AdminHome;
