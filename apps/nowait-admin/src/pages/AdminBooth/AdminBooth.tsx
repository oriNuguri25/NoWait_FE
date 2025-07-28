import { useState } from "react";
import booth_thumbnail from "../../assets/booth_thumbnail.svg";
import editIcon from "../../assets/edit_icon.svg";
import placeholderIcon from "../../assets/image_placeholder.svg";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import OperatingTimeSelector from "./components/OperatingTimeSelector";
import NoticeEditor from "./components/NoticeEditor";
import MenuSection from "./components/MenuSection";

const BoothSection = ({
  boothName,
  setBoothName,
  isFocused,
  setIsFocused,
  boothIntro,
  setBoothIntro,
  isTextareaFocused,
  setIsTextareaFocused,
  bannerImages,
  setBannerImages,
}: {
  boothName: string;
  setBoothName: (val: string) => void;
  isFocused: boolean;
  setIsFocused: (val: boolean) => void;
  boothIntro: string;
  setBoothIntro: (val: string) => void;
  isTextareaFocused: boolean;
  setIsTextareaFocused: (val: boolean) => void;
  bannerImages: File[];
  setBannerImages: (val: File[]) => void;
}) => (
  <>
    <div className="flex items-center py-[50px]">
      <div className="relative self-start">
        <div className="h-25 w-25 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
          <img src={booth_thumbnail} alt="썸네일" className="object-cover" />
        </div>
        <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 border border-[#ECECEC]">
          <img src={editIcon} className="w-4 h-4" alt="편집" />
        </button>
      </div>
      <div className="flex flex-col w-[494px] ml-[50px] h-[115px]">
        <span className="text-title-18-bold text-gray-500 mb-[6px] flex">
          부스명
        </span>
        <span className="text-sm text-gray-500 mb-[14px] flex">
          컴퓨터공학과
        </span>
        <div className="flex h-full relative">
          <input
            type="text"
            value={boothName}
            maxLength={20}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setBoothName(e.target.value)}
            placeholder="부스명을 입력해주세요"
            className="w-full h-full bg-black-5 border border-[#DDDDDD] rounded-xl px-4 py-2 text-sm bg-black-5 "
          />
          <span className="absolute right-[20px] top-1/2 -translate-y-1/2 text-xs text-gray-400">
            <span className={isFocused ? "text-black" : "text-gray-400"}>
              {boothName.length}
            </span>{" "}
            / 20
          </span>
        </div>
      </div>
    </div>

    {/* 부스 소개 */}
    <div className="flex flex-col mb-[50px] relative">
      <label className="block font-semibold">부스 소개</label>
      <p className="mt-[6px] mb-[14px] text-14-regular text-black-60">
        부스를 자유롭게 소개해주세요
      </p>
      <textarea
        maxLength={250}
        className="w-full h-32 border border-[#DDDDDD] bg-black-5 bg-black-5 focus:bg-white rounded-lg text-sm px-[20px] pt-[16px] pr-[147px] pb-[33px]"
        onFocus={() => setIsTextareaFocused(true)}
        onBlur={() => setIsTextareaFocused(false)}
        placeholder={isTextareaFocused ? "" : "부스 소개를 입력해주세요"}
        value={boothIntro}
        onChange={(e) => setBoothIntro(e.target.value)}
      />
      <div className="absolute bottom-[12px] right-[20px] text-right text-xs text-gray-400">
        {boothIntro.length} / 250
      </div>
    </div>

    {/* 배너 이미지 */}
    <div className="flex flex-col mb-[50px]">
      <label className="block font-semibold">배너 이미지</label>
      <p className="text-14-regular text-black-60 mb-[14px]">
        첫번째 이미지는 우리 부스를 대표하는 이미지로 설정돼요
      </p>
      <div className="flex gap-[10px]">
        {Array(3)
          .fill(null)
          .map((_, i) => (
            <label
              key={i}
              className="w-[150px] h-25 bg-black-5 border border-[#DDDDDD] rounded-xl flex items-center justify-center cursor-pointer"
            >
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const newImages = [...bannerImages];
                    newImages[i] = file;
                    setBannerImages(newImages);
                  }
                }}
              />
              {bannerImages[i] ? (
                <img
                  src={URL.createObjectURL(bannerImages[i])}
                  alt={`배너 ${i + 1}`}
                  className="object-cover w-full h-full rounded-lg"
                />
              ) : (
                <img src={placeholderIcon} className="" alt="업로드" />
              )}
            </label>
          ))}
      </div>
    </div>

    <OperatingTimeSelector />

    {/* 공지사항 */}
    <NoticeEditor />

    {/* 버튼 */}
    <div className="flex w-full gap-[10px] mt-[50px]">
      <button className="w-full h-[51px] py-4 rounded-lg bg-[#F6F6F6] text-black-70 text-14-regular">
        미리보기
      </button>
      <button className="w-full h-[51px] py-4 rounded-lg bg-[#111114] text-white text-14-regular">
        저장하기
      </button>
    </div>
  </>
);

const BoothForm = () => {
  const width = useWindowWidth();
  const isTablet = width >= 768 && width <= 1024;
  const [activeTab, setActiveTab] = useState<"booth" | "menu">("menu");
  const [boothName, setBoothName] = useState("");
  const [boothIntro, setBoothIntro] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const [bannerImages, setBannerImages] = useState<File[]>([]);

  return (
    <div
      className={`w-full bg-white overflow-y-auto border-l border-l-[#ECECEC] ${
        isTablet ? "px-[90px] py-[20px]" : "px-[90px] py-[20px]"
      }`}
    >
      {/* 탭 */}
      <div className="flex">
        <button
          className={`px-4 py-2 mr-2 rounded-full text-sm font-semibold ${
            activeTab === "menu"
              ? "bg-black text-white"
              : "bg-white text-black-60 border border-black-35"
          }`}
          onClick={() => setActiveTab("menu")}
        >
          메뉴 관리
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            activeTab === "booth"
              ? "bg-black text-white"
              : "bg-white text-black-60 border border-black-35"
          }`}
          onClick={() => setActiveTab("booth")}
        >
          부스 관리
        </button>
      </div>
      {activeTab === "booth" ? (
        <BoothSection
          boothName={boothName}
          setBoothName={setBoothName}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
          boothIntro={boothIntro}
          setBoothIntro={setBoothIntro}
          isTextareaFocused={isTextareaFocused}
          setIsTextareaFocused={setIsTextareaFocused}
          bannerImages={bannerImages}
          setBannerImages={setBannerImages}
        />
      ) : (
        <MenuSection />
      )}
    </div>
  );
};

export default BoothForm;
