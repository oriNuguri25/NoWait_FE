import { useEffect, useMemo, useState } from "react";
import CardBox from "./components/CardBox";
import RoundTabButton from "./components/RoundTabButton";
import refreshIcon from "../../assets/refresh.svg";
import { WaitingCard } from "./components/WaitingCard";
import { useGetReservationList } from "../../hooks/useGetReservationList";
import on from "../../assets/on.svg";
import onIcon from "../../assets/toggleOn.svg"; // 켜짐 상태 이미지
import offIcon from "../../assets/toggleOFF.svg";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { useUpdateReservationStatus } from "../../hooks/useUpdateReservationStatus";
type WaitingStatus = "WAITING" | "CALLING" | "CONFIRMED" | "CANCELLED";

interface Reservation {
  id: number;
  time: string;
  requestedAt: string;
  waitMinutes: number;
  peopleCount: number;
  name: string;
  phone: string;
  status: WaitingStatus;
  calledAt?: string;
}

const AdminHome = () => {
  const width = useWindowWidth();
  const [noShowIds, setNoShowIds] = useState<number[]>([]);
  const { mutate: updateStatus } = useUpdateReservationStatus();

  console.log(width);

  const isCompact = width < 1024;

  const [activeTab, setActiveTab] = useState("전체 보기");
  const storeId = 1; //현재는 임시로 mockdata씀
  const [isOn, setIsOn] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const { data, isLoading, isError } = useGetReservationList(storeId);

  const toggle = () => setIsOn((prev) => !prev);

  const waitingCount = reservations.filter(
    (res) => res.status === "WAITING"
  ).length;
  const callingCount = reservations.filter(
    (res) => res.status === "CALLING"
  ).length;
  const confirmedCount = reservations.filter(
    (res) => res.status === "CONFIRMED"
  ).length;
  const cancelledCount = reservations.filter(
    (res) => res.status === "CANCELLED"
  ).length;

  const statusMap = {
    WAITING: "대기 중",
    CALLING: "호출 중",
    CONFIRMED: "입장 완료",
    CANCELLED: "대기 취소",
  };

  const filteredReservations = useMemo(() => {
    const sorted = [...reservations].sort((a, b) => a.id - b.id);
    if (activeTab === "전체 보기") return reservations;

    const targetStatus = Object.entries(statusMap).find(
      ([, label]) => label === activeTab
    )?.[0];

    if (!targetStatus) return [];

    return sorted.filter((res) => res.status === targetStatus);
  }, [reservations, activeTab]);

  // 호출 버튼 클릭 이벤트
  const handleCall = (id: number) => {
    // 상태 변화 api 호출 --> 성공시 --> reservation status 변경(호출 시간 calledAt추가해야 됨)
    updateStatus(
      { reservationId: id, status: "CALLING" },
      {
        onSuccess: () => {
          setReservations((prev) =>
            prev.map((res) =>
              res.id === id
                ? {
                    ...res,
                    status: "CALLING",
                    calledAt: new Date().toISOString(),
                  }
                : res
            )
          );
        },
        onError: () => {
          alert("호출 상태 변경 실패");
        },
      }
    );
  };

  const handleEnter = (id: number) => {
    updateStatus(
      { reservationId: id, status: "CONFIRMED" },
      {
        onSuccess: () => {
          setReservations((prev) =>
            prev.map((res) =>
              res.id === id ? { ...res, status: "CONFIRMED" } : res
            )
          );
        },
      }
    );
  };

  const handleClose = (id: number) => {
    updateStatus(
      { reservationId: id, status: "CANCELLED" },
      {
        onSuccess: () => {
          setReservations((prev) =>
            prev.map((res) =>
              res.id === id ? { ...res, status: "CANCELLED" } : res
            )
          );
        },
      }
    );
  };

  const handleNoShow = (id: number) => {
    const target = reservations.find((res) => res.id === id);
    if (!target || target.status === "CANCELLED") return;

    updateStatus(
      { reservationId: id, status: "CANCELLED" },
      {
        onSuccess: () => {
          setReservations((prev) =>
            prev.map((res) =>
              res.id === id ? { ...res, status: "CANCELLED" } : res
            )
          );
          setNoShowIds((prev) => [...prev, id]);
        },
      }
    );
  };

  useEffect(() => {
    if (!data?.reservationList) return;

    const now = Date.now();

    setReservations(
      data.reservationList.map((res, idx) => {
        const requested = new Date(res.requestedAt);
        return {
          id: res.id,
          requestedAt: res.requestedAt, //서버 데이터 문자열 그대로 사용("2025-06-24T12:33:26")
          time: requested.toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
          waitMinutes: Math.floor((now - requested.getTime()) / 60000),
          peopleCount: res.partySize,
          name: res.userName,
          phone: "010-****-****",
          status: res.status,
          calledAt:
            res.status === "CALLING" ? requested.toISOString() : undefined,
        };
      })
    );
  }, [data]);

  return (
    <div
      className={`w-full max-w-[804px] flex flex-col items-center mx-auto space-y-6 min-[375px]:px-[20px] lg:px-[30px]`}
    >
      <section
        id="대기 현황"
        className="flex w-full [@media(min-width:375px)_and_(max-width:431px)]:justify-center"
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
            <CardBox
              title="대기 팀 수"
              count={waitingCount}
              bottomLabel={`호출 중 ${callingCount}팀`}
            />
            <CardBox
              title="입장 완료"
              count={confirmedCount}
              bottomLabel={`대기 취소 ${cancelledCount}팀`}
            />
          </div>
        </div>
      </section>

      <section id="대기자 목록" className="flex flex-col w-full">
        <h1 className="title-20-bold mb-5">대기자 목록</h1>
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-hide [@media(max-width:431px)]:flex-nowrap">
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

      <div className="w-full grid grid-cols-1 gap-[10px] md:grid-cols-2 [@media(max-width:431px)]:place-items-center">
        {filteredReservations.map((res) => {
          const requested = new Date(res.requestedAt);

          return (
            <WaitingCard
              key={res.id}
              number={res.id}
              time={requested.toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
              waitMinutes={Math.floor(
                (Date.now() - requested.getTime()) / 60000
              )}
              peopleCount={res.peopleCount}
              name={res.name}
              phone="010-****-****"
              status={res.status}
              calledAt={res.calledAt}
              isNoShow={noShowIds.includes(res.id)}
              onCall={() => handleCall(res.id)}
              onEnter={() => handleEnter(res.id)}
              onClose={() => handleClose(res.id)}
              onNoShow={() => handleNoShow(res.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AdminHome;
