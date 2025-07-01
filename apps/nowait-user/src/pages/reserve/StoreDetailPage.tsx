import MenuList from "../../components/MenuList";
import Arrow from "../../assets/icon/arrow-right.svg?react";
import MapPin from "../../assets/icon/map-pin.svg?react";
import Clock from "../../assets/icon/clock.svg?react";
import BookMark from "../../assets/icon/bookmark.svg?react";
import PageFooterButton from "../../components/order/PageFooterButton";
import { Button } from "@repo/ui";

const TAG = [
  { id: 1, type: "default", tag: "태그 추가" },
  { id: 2, type: "default", tag: "컴공 과" },
  { id: 3, type: "waiting", tag: "웨이팅 15팀" },
];

const StoreDetailPage = () => {
  return (
    <div>
      <div className="px-5">
        <h1 className="-mx-5 h-[246px] bg-amber-400">
          <img className="w-full" src="" alt="음식 메뉴 이미지" />
        </h1>
        <section className="border-b-1 border-[#f4f4f4]">
          <div className="flex justify-between items-center py-[21px]">
            <div className="flex flex-col justify-between gap-[3px]">
              <p className="text-14-regular text-black-70">컴퓨터공학과</p>
              <h1 className="text-headline-22-bold">스페이시스</h1>
            </div>
            <img
              className="w-[52px] h-[52px] rounded-[100%] bg-black-60"
              src=""
              alt="학과 대표 이미지"
            />
          </div>
          <ul className="pb-5 flex gap-1.5">
            {TAG.map((item) => {
              return (
                <li
                  key={item.id}
                  className={`text-[12px] font-bold rounded-[4px] px-2 py-[7px] ${
                    item.type === "default"
                      ? "bg-[#f1f1f1] text-[#959595]"
                      : "bg-[#ffeedf] text-[#ff5e07]"
                  }`}
                >
                  {item.tag}
                </li>
              );
            })}
          </ul>
        </section>
        <section className="pt-5 pb-[28px]">
          <div className="mb-6">
            <p className="flex items-center mb-1.5 text-16-regular text-black-80">
              <span className="mr-1.5">
                <MapPin fill="#D9D9D9" />
              </span>
              가천대학교 무한광장
            </p>
            <p className="flex items-center text-16-regular text-black-80">
              <span className="mr-1.5">
                <Clock fill="#D9D9D9" />
              </span>
              18:00 - 24:00
            </p>
          </div>
          <h2 className="mb-10 text-14-regular text-black-80">
            안녕하세요! 컴공과가 버그 없이 준비한 이스터에그가 가득 부스
            스페이시스입니다 🚀 남다른 디버깅 실력으로 굽는 츄러스, 데이터 손실
            없는 아이스티, 그리고 메모리 오류 없는 넉넉한 양까지 완벽
            구현했습니다.
          </h2>
          <div className="flex justify-between items-center py-3.5 px-4 bg-black-15 rounded-[10px]">
            <div className="flex gap-1.5 min-w-0">
              <p className="text-[14px] font-bold text-black-50 shrink-0">
                공지
              </p>
              <h1 className="text-14-medium text-black-70 overflow-hidden text-ellipsis line-clamp-1">
                입장 시 신분증 검사 필수 입장 시 신분증
                검사dddddddasdasdasdddddddddddddddddddddddddaaaaaaaaaaaa
              </h1>
            </div>
            <Arrow className="shrink-0" fill="#AAAAAA" />
          </div>
        </section>
        <div className="-mx-5 bg-black-25 h-[16px] mb-[30px]"></div>
        <MenuList />
      </div>
      <PageFooterButton className="gap-2.5">
        <Button className="border" backgroundColor="white" borderColor="#ececec" buttonType="icon">
          <BookMark />
        </Button>
        <Button>대기하기</Button>
      </PageFooterButton>
    </div>
  );
};

export default StoreDetailPage;
