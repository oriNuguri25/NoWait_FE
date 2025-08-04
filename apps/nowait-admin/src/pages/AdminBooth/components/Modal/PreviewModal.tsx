import React from "react";
import clock from "../../../../assets/preview/clock.svg";
import pin from "../../../../assets/preview/map-pin.svg";
import right from "../../../../assets/preview/keyboard_arrow_right.svg";
import boothPlaceholder from "../../../../assets/booth_thumbnail.svg";
import RedBadge from "../../../../components/RedBadge";
import DOMPurify from "dompurify";
interface PreviewBannerImage {
  id: number;
  imageUrl: string;
  imageType: "BANNER";
}

interface PreviewProfileImage {
  id: number;
  imageUrl: string;
  imageType: "PROFILE";
}

interface PreviewModalProps {
  boothName: string;
  departName: string;
  boothIntro: string;
  noticeTitle: string;
  boothNotice: string;
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
  profileImage?: PreviewProfileImage | null;
  bannerImages?: PreviewBannerImage[];
  onClose: () => void;
}
const PreviewModal: React.FC<PreviewModalProps> = ({
  boothName,
  departName,
  boothIntro,
  noticeTitle,
  startHour,
  startMinute,
  endHour,
  endMinute,
  profileImage,
  bannerImages = [],
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="flex flex-col items-center bg-white rounded-[20px] w-[372px] h-[706px] p-[30px]">
        <h2 className="text-lg font-bold mb-[10px] text-center">
          화면 미리보기
        </h2>
        <p className="text-sm text-gray-500 text-center mb-[30px]">
          입력한 정보가 사용자 화면에 이렇게 표시 돼요
        </p>

        <div className="border border-[#ECECEC] w-[236px] h-[481px] rounded-[18px] overflow-hidden">
          {/* 대표 이미지 */}
          {bannerImages[0] ? (
            <div className="rounded-t-[18px] w-full h-[154px] overflow-hidden">
              <img
                src={bannerImages[0].imageUrl}
                alt="대표 이미지"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-full h-[160px] bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">대표 이미지 없음</span>
            </div>
          )}

          <div className="pt-[13px] pb-[20px] px-3 h-full">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <p className="text-major text-black-70">{departName}</p>
                <h3 className="text-xl font-bold">{boothName || "부스명"}</h3>
              </div>
              <div className="h-[32px] w-[32px] rounded-full overflow-hidden">
                <img
                  src={profileImage ? profileImage.imageUrl : boothPlaceholder}
                  className=""
                />
              </div>
            </div>
            <RedBadge label="대기 0팀" small={true} />
            <div className="h-[1px] my-[13px] bg-[#F4F4F4]" />
            <span className="flex text-location text-black-80 gap-[3.78px]">
              <img src={pin} />
              {"가천대학교 운동장"}
            </span>
            <span className="flex text-location text-black-80 gap-[3.78px]">
              <img src={clock} />
              {startHour || "18"}:{startMinute || "00"} ~ {endHour || "24"}:
              {endMinute || "00"}
            </span>
            <div
              className="h-[98px] mt-[15.43px] mb-[28.5px]"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(boothIntro),
              }}
            ></div>
            <div className="flex items-center justify-between w-full rounded-[6.29px] px-[10px] py-[8.81px] bg-black-10 border-[#ECECEC] border-[0.63px]">
              <p className="text-notice-medium text-black-70 truncate">
                <span className="text-black-50 text-notice mr-[3.78px]">
                  공지
                </span>{" "}
                {noticeTitle}
              </p>
              <img src={right} />
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full h-[48px] mt-[30px]  bg-gray-100 rounded-lg py-2 text-sm font-medium text-gray-700"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default PreviewModal;
