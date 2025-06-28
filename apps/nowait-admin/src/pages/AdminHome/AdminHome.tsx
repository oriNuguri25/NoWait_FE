import { useMemo, useState } from "react";
import CardBox from "./components/CardBox";
import RoundTabButton from "./components/RoundTabButton";
import refreshIcon from "../../assets/refresh.svg";
import { WaitingCard } from "./components/WaitingCard";
import { useGetReservationList } from "../../hooks/useGetReservationList";
import on from "../../assets/on.svg";
import onIcon from "../../assets/toggleOn.svg"; // 켜짐 상태 이미지
import offIcon from "../../assets/toggleOFF.svg";
type WaitingStatus = "대기 중" | "호출 중" | "입장 완료" | "대기 취소";

interface Reservation {
  id: number;
  number: number;
  time: string;
  waitMinutes: number;
  peopleCount: number;
  name: string;
  phone: string;
  status: WaitingStatus;
}

const AdminHome = () => {
  const handleCall = () => alert("🔔 고객 호출");
  const handleEnter = () => alert("🏢 고객 입장 처리");
  const handleClose = () => alert("❌ 카드 닫기");
  const [activeTab, setActiveTab] = useState("전체 보기");
  const storeId = 1; //현재는 임시로 mockdata씀
  const [isOn, setIsOn] = useState(false);

  const toggle = () => setIsOn((prev) => !prev);
  const statusMap = {
    WAITING: "대기 중",
    CALLING: "호출 중",
    CONFIRMED: "입장 완료",
    CANCELLED: "대기 취소",
  };
  const { data, isLoading, isError } = useGetReservationList(storeId);
  console.log(data, "ReservationList");

  // 전체 목록 예약순 예약 번호 부여
  const numberedReservations = useMemo(() => {
    if (!data) return [];
    return data.reservationList.map((res, idx) => ({
      ...res,
      number: idx + 1,
    }));
  }, [data]);

  const filteredReservations = useMemo(() => {
    if (activeTab === "전체 보기") return numberedReservations;

    const targetStatus = Object.entries(statusMap).find(
      ([, label]) => label === activeTab
    )?.[0];

    if (!targetStatus) return [];
    return numberedReservations.filter((res) => res.status === targetStatus);
  }, [numberedReservations, activeTab]);

  return (
    <div className=" container-responsive space-y-6">
      <section
        id="대기 현황"
        className="flex [@media(min-width:375px)_and_(max-width:431px)]:justify-center"
      >
        <div className="flex flex-col w-full">
          <div className="flex justify-between mb-5">
            <div className="flex items-center">
              <h1 className="title-20-bold">대기 현황</h1>&nbsp;
              <span>
                <img src={on} />
              </span>
            </div>
            <button onClick={toggle}>
              <img
                src={isOn ? onIcon : offIcon}
                alt={isOn ? "On" : "Off"}
                className="w-10 h-10"
              />
            </button>
          </div>
          <div className="flex [@media(min-width:375px)_and_(max-width:431px)]:justify-between">
            <CardBox title="대기 팀 수" count={14} bottomLabel="호출 중 3팀" />
            <CardBox title="입장 완료" count={6} bottomLabel="대기 취소 1팀" />
          </div>
        </div>
      </section>

      <section id="대기자 목록" className="flex flex-col">
        <h1 className="title-20-bold mb-5">대기자 목록</h1>
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {["전체 보기", "대기 중", "호출 중", "입장 완료", "대기 취소"].map(
              (label) => (
                <RoundTabButton
                  key={label}
                  label={label}
                  active={activeTab === label}
                  onClick={() => setActiveTab(label)}
                />
              )
            )}
          </div>
          <div className="hover:rotate-90 transition-transform duration-500 cursor-pointer">
            <img
              src={refreshIcon}
              className="[@media(max-width:431px)]:hidden"
            />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 grid-gutter-responsive md:grid-cols-2 [@media(max-width:431px)]:place-items-center">
        {filteredReservations.map((res) => (
          <WaitingCard
            key={res.id}
            number={res.number}
            time={new Date(res.requestedAt).toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            waitMinutes={3}
            peopleCount={res.partySize}
            name={res.userName}
            phone="010-****-****"
            onCall={handleCall}
            onEnter={handleEnter}
            onClose={handleClose}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
