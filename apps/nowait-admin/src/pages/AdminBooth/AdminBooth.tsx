import { useEffect, useState } from "react";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import MenuSection from "./components/MenuSection";
import { useGetStore } from "../../hooks/booth/store/useGetStore";
import { useUpdateStore } from "../../hooks/booth/store/useUpdateStore";
import { useUploadStoreProfileImage } from "../../hooks/booth/store/useUploadStoreProfileImage";
import { useUploadStoreBannerImages } from "../../hooks/booth/store/useUploadStoreBannerImages";
import type { BannerImage } from "./types/booth";
import type { ProfileImage } from "./types/booth";
import BoothSection from "./components/BoothSection";

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
  const [bannerImages, setBannerImages] = useState<BannerImage[]>([]);
  const [profileImage, setProfileImage] = useState<ProfileImage>(null);

  console.log(store, "store 정보");

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
          // 업로드할 파일만 필터링
          const filesToUpload = bannerImages.filter(
            (img): img is File => img instanceof File
          );

          if (filesToUpload.length > 0) {
            // 첫 번째 파일은 대표 프로필 이미지
            uploadProfileImage({ storeId, image: filesToUpload[0] });

            // 나머지는 배너 이미지
            const restFiles = filesToUpload.slice(1);
            if (restFiles.length > 0) {
              uploadBannerImages({ storeId, images: restFiles });
            }
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

      if (store.bannerImages) {
        const formatted = store.bannerImages.map((img: any) => ({
          ...img,
          imageType: img.imageType ?? "BANNER", // 기본값
        }));
        setBannerImages(formatted);
      }
      if (store?.profileImage) {
        setProfileImage({
          id: store.profileImage.id,
          imageUrl: store.profileImage.imageUrl,
          imageType: "PROFILE",
        });
      }
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
            profileImage={profileImage}
            setProfileImage={setProfileImage}
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
