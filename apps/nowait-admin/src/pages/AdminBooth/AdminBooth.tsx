import { useEffect, useState } from "react";
import placeholderIcon from "../../assets/image_placeholder.svg";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import OperatingTimeSelector from "./components/OperatingTimeSelector";
import NoticeEditor from "./components/NoticeEditor";
import MenuSection from "./components/MenuSection";
import { useGetStore } from "../../hooks/booth/store/useGetStore";
import { useUpdateStore } from "../../hooks/booth/store/useUpdateStore";
import { useUploadStoreProfileImage } from "../../hooks/booth/store/useUploadStoreProfileImage";
import { useUploadStoreBannerImages } from "../../hooks/booth/store/useUploadStoreBannerImages";
import BoothProfileImage from "./components/BoothProfileImage";

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
  boothNotice,
  setBoothNotice,
  startHour,
  setStartHour,
  startMinute,
  setStartMinute,
  endHour,
  setEndHour,
  endMinute,
  setEndMinute,
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
  boothNotice: string;
  setBoothNotice: (val: string) => void;
  startHour: string;
  setStartHour: (val: string) => void;
  startMinute: string;
  setStartMinute: (val: string) => void;
  endHour: string;
  setEndHour: (val: string) => void;
  endMinute: string;
  setEndMinute: (val: string) => void;
}) => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  return (
    <>
      <div className="flex items-center py-[50px]">
        <BoothProfileImage
          profileImage={profileImage}
          setProfileImage={setProfileImage}
        />
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

      <OperatingTimeSelector
        startHour={startHour}
        setStartHour={setStartHour}
        startMinute={startMinute}
        setStartMinute={setStartMinute}
        endHour={endHour}
        setEndHour={setEndHour}
        endMinute={endMinute}
        setEndMinute={setEndMinute}
      />

      {/* 공지사항 */}
      <NoticeEditor notice={boothNotice} setNotice={setBoothNotice} />

      {/* 버튼 */}
    </>
  );
};

const BoothForm = () => {
  const width = useWindowWidth();
  const isTablet = width >= 768 && width <= 1024;
  const storeId = 1; // TODO: 실제 storeId 받아오기
  const { data: store, isLoading } = useGetStore(storeId);
  const { mutate: updateStore } = useUpdateStore();
  const { mutate: uploadProfileImage } = useUploadStoreProfileImage();
  const { mutate: uploadBannerImages } = useUploadStoreBannerImages();

  const [activeTab, setActiveTab] = useState<"booth" | "menu">("menu");
  const [boothName, setBoothName] = useState("");
  const [boothIntro, setBoothIntro] = useState("");
  const [boothNotice, setBoothNotice] = useState("");
  const [startHour, setStartHour] = useState("");
  const [startMinute, setStartMinute] = useState("");
  const [endHour, setEndHour] = useState("");
  const [endMinute, setEndMinute] = useState("");

  const [isFocused, setIsFocused] = useState(false);
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const [bannerImages, setBannerImages] = useState<File[]>([]);

  const handleSave = () => {
    updateStore(
      {
        storeId,
        name: boothName,
        location: "제2학관 앞마당", // 입력받는 필드 필요
        description: boothIntro,
        notice: boothNotice,
        openTime: `${startHour}${startMinute}${endHour}${endMinute}`,
      },
      {
        onSuccess: () => {
          // 프로필 이미지 업로드
          if (bannerImages[0]) {
            uploadProfileImage({ storeId, image: bannerImages[0] });
          }

          // 나머지 배너 이미지 업로드
          const bannerFiles = bannerImages.slice(1).filter(Boolean);
          if (bannerFiles.length > 0) {
            uploadBannerImages({ storeId, images: bannerFiles });
          }

          alert("부스 정보가 성공적으로 저장되었습니다!");
        },
        onError: () => alert("부스 정보 수정에 실패했습니다."),
      }
    );
  };

  useEffect(() => {
    if (store) {
      setBoothName(store.name);
      setBoothIntro(store.description);

      // 배너 이미지는 서버에서 URL로 받으므로 File 객체로 변환 불가 → 미리보기 용으로만 URL 보관
      // 필요한 경우 bannerImages를 string[]으로 따로 관리
      // 여기서는 단순히 console에 출력
      console.log("배너 이미지:", store.bannerImages);
    }
  }, [store]);

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
        <>
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
            boothNotice={boothNotice}
            setBoothNotice={setBoothNotice}
            startHour={startHour}
            setStartHour={setStartHour}
            startMinute={startMinute}
            setStartMinute={setStartMinute}
            endHour={endHour}
            setEndHour={setEndHour}
            endMinute={endMinute}
            setEndMinute={setEndMinute}
          />
          <div className="flex w-full gap-[10px] mt-[50px]">
            <button className="w-full h-[51px] py-4 rounded-lg bg-[#F6F6F6] text-black-70 text-14-regular">
              미리보기
            </button>
            <button
              className="w-full h-[51px] py-4 rounded-lg bg-[#111114] text-white text-14-regular"
              onClick={handleSave}
            >
              저장하기
            </button>
          </div>
        </>
      ) : (
        <MenuSection />
      )}
    </div>
  );
};

export default BoothForm;
