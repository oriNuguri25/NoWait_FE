import { useEffect, useMemo, useState } from "react";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import MenuSection from "./components/MenuSection";
import { useGetStore } from "../../hooks/booth/store/useGetStore";
import { useUpdateStore } from "../../hooks/booth/store/useUpdateStore";
import { useUploadStoreProfileImage } from "../../hooks/booth/store/useUploadStoreProfileImage";
import { useUploadStoreBannerImages } from "../../hooks/booth/store/useUploadStoreBannerImages";
import type { BannerImage } from "./types/booth";
import type { ProfileImage } from "./types/booth";
import BoothSection from "./components/BoothSection";
import AccountPage from "./components/AccountPage";
import PreviewModal from "./components/Modal/PreviewModal";
import SaveButton from "./components/Button/saveBttn";

const BoothForm = () => {
  const width = useWindowWidth();
  const isTablet = width > 768;
  const isMobile = !isTablet;
  // && width <= 1024
  const storeId = Number(localStorage.getItem("storeId"));
  console.log(storeId, "스토어 아이디");

  const { data: store, refetch } = useGetStore(storeId);
  const { mutate: updateStore } = useUpdateStore();
  const { mutate: uploadProfileImage } = useUploadStoreProfileImage();
  const { mutate: uploadBannerImages } = useUploadStoreBannerImages();

  const [activeTab, setActiveTab] = useState<"booth" | "menu" | "account">(
    "menu"
  );
  const [boothName, setBoothName] = useState("");
  const [departName, setDepartName] = useState("");
  const [boothIntro, setBoothIntro] = useState("");
  const [boothNotice, setBoothNotice] = useState("");
  const [startHour, setStartHour] = useState("");
  const [startMinute, setStartMinute] = useState("");
  const [endHour, setEndHour] = useState("");
  const [endMinute, setEndMinute] = useState("");
  const [noticeTitle, setNoticeTitle] = useState("");

  const [isFocused, setIsFocused] = useState(false);
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const [bannerImages, setBannerImages] = useState<BannerImage[]>([]);
  const [profileImage, setProfileImage] = useState<ProfileImage>(null);

  const [showPreview, setShowPreview] = useState(false);

  const [baseline, setBaseline] = useState<{
    name: string;
    description: string;
    noticeTitle: string;
    noticeContent: string;
    openTime: string; // "HHmmHHmm"
    profileId: number | null;
    bannerIds: Array<number | null>; // 첫 3개 슬롯 기준
  } | null>(null);

  const norm = (s?: string | null) => (s ?? "").trim();
  const arrEq = (a: any[], b: any[]) =>
    a.length === b.length && a.every((v, i) => v === b[i]);

  const handleSave = () => {
    updateStore(
      {
        storeId,
        name: boothName,
        location: "제2학관 앞마당", // 입력받는 필드 필요
        description: boothIntro,
        noticeTitle: noticeTitle,
        noticeContent: boothNotice,
        openTime: `${startHour}${startMinute}${endHour}${endMinute}`,
      },
      {
        onSuccess: () => {
          if (profileImage && profileImage instanceof File) {
            uploadProfileImage({
              storeId,
              image: profileImage,
            });
          }

          // 배너 이미지 업로드 (File 타입만 필터링),삭제한 이미지 필터링
          const newBannerFiles = bannerImages.filter(
            (img): img is File => img instanceof File && img !== null
          );

          if (newBannerFiles.length > 0) {
            uploadBannerImages({
              storeId,
              images: newBannerFiles,
            });
          }

          console.log("부스 정보가 성공적으로 저장되었습니다!");
          refetch();
        },
        onError: () => console.log("부스 정보 수정에 실패했습니다."),
      }
    );
  };

  useEffect(() => {
    if (!store) return;

    setBoothName(store.name ?? "");
    setBoothIntro(store.description ?? "");
    setDepartName(store.departmentName ?? "");
    setNoticeTitle(store.noticeTitle ?? "");
    setBoothNotice(store.noticeContent ?? "");

    // 운영시간 분해 (예: "09001800")
    const ot = store.openTime ?? "";
    if (ot.length === 8) {
      setStartHour(ot.slice(0, 2));
      setStartMinute(ot.slice(2, 4));
      setEndHour(ot.slice(4, 6));
      setEndMinute(ot.slice(6, 8));
    }

    // 배너/프로필 상태 세팅
    if (store.bannerImages) {
      const formatted = store.bannerImages.map((img: any) => ({
        ...img,
        imageType: img.imageType ?? "BANNER",
      }));
      setBannerImages(formatted);
    } else {
      setBannerImages([]);
    }

    if (store?.profileImage) {
      setProfileImage({
        id: store.profileImage.id,
        imageUrl: store.profileImage.imageUrl,
        imageType: "PROFILE",
      });
    } else {
      setProfileImage(null);
    }

    // baseline 스냅샷 구성 (첫 3개 슬롯 기준)
    const first3 = (store.bannerImages ?? []).slice(0, 3);
    setBaseline({
      name: store.name ?? "",
      description: store.description ?? "",
      noticeTitle: store.noticeTitle ?? "",
      noticeContent: store.noticeContent ?? "",
      openTime: store.openTime ?? "",
      profileId: store.profileImage?.id ?? null,
      bannerIds: [
        first3[0]?.id ?? null,
        first3[1]?.id ?? null,
        first3[2]?.id ?? null,
      ],
    });
  }, [store]);

  const currentOpenTime = `${startHour}${startMinute}${endHour}${endMinute}`;

  const currentProfileSig = useMemo(() => {
    if (!profileImage) return null;
    return profileImage instanceof File
      ? "file"
      : (profileImage as any).id ?? null;
  }, [profileImage]);

  const currentBannerSig = useMemo<(string | number | null)[]>(() => {
    // UI가 3 슬롯이라 가정
    const slots = [bannerImages[0], bannerImages[1], bannerImages[2]];
    return slots.map((img) => {
      if (!img) return null;
      return img instanceof File ? "file" : (img as any).id ?? null;
    });
  }, [bannerImages]);

  // 5) 변경 여부 계산
  const hasChanges = useMemo(() => {
    if (!baseline) return false; // 아직 로딩 중이면 비활성화

    const textChanged =
      norm(boothName) !== norm(baseline.name) ||
      norm(boothIntro) !== norm(baseline.description) ||
      norm(noticeTitle) !== norm(baseline.noticeTitle) ||
      norm(boothNotice) !== norm(baseline.noticeContent);

    const timeChanged = norm(currentOpenTime) !== norm(baseline.openTime);

    const profileChanged = currentProfileSig !== baseline.profileId;

    const bannerChanged = !arrEq(currentBannerSig, baseline.bannerIds);

    return textChanged || timeChanged || profileChanged || bannerChanged;
  }, [
    baseline,
    boothName,
    boothIntro,
    noticeTitle,
    boothNotice,
    currentOpenTime,
    currentProfileSig,
    currentBannerSig,
  ]);
  return (
    <div
      className={`${
        isMobile ? "flex flex-col" : ""
      } bg-white w-full overflow-y-auto border-l border-l-[#ECECEC] ${
        isTablet ? "px-[100px] py-[20px]" : "px-[20px] py-[20px]"
      }`}
    >
      <div className="max-w-[614px] w-full mx-auto">
        {/* 탭 */}
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              activeTab === "menu"
                ? "bg-black text-white"
                : "bg-white text-black-60"
            }`}
            onClick={() => setActiveTab("menu")}
          >
            메뉴 관리
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              activeTab === "booth"
                ? "bg-black text-white"
                : "bg-white text-black-60 "
            }`}
            onClick={() => setActiveTab("booth")}
          >
            부스 관리
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              activeTab === "account"
                ? "bg-black text-white"
                : "bg-white text-black-60 "
            }`}
            onClick={() => setActiveTab("account")}
          >
            계좌 관리
          </button>
        </div>
        {activeTab === "booth" ? (
          <>
            <BoothSection
              departName={departName}
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
              noticeTitle={noticeTitle}
              setNoticeTitle={setNoticeTitle}
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
              isMobile={isMobile}
            />
            <div className="flex max-w-[614px] w-full mt-[50px]">
              {isMobile && (
                <button
                  className="w-full h-[60px] p-5 rounded-xl bg-black-20 text-black-70 text-17-semibold mr-2"
                  onClick={() => setShowPreview(true)}
                >
                  미리보기
                </button>
              )}
              <SaveButton disabled={!hasChanges} onClick={handleSave} />
              {showPreview && isMobile && (
                <PreviewModal
                  onClose={() => setShowPreview(false)}
                  boothName={boothName}
                  departName={departName}
                  boothIntro={boothIntro}
                  noticeTitle={noticeTitle}
                  boothNotice={boothNotice}
                  startHour={startHour}
                  startMinute={startMinute}
                  endHour={endHour}
                  endMinute={endMinute}
                  profileImage={
                    profileImage
                      ? profileImage instanceof File
                        ? {
                            id: 0,
                            imageUrl: URL.createObjectURL(profileImage),
                            imageType: "PROFILE",
                          }
                        : profileImage
                      : null
                  }
                  bannerImages={bannerImages.map((img, i) =>
                    img instanceof File
                      ? {
                          id: i,
                          imageUrl: URL.createObjectURL(img),
                          imageType: "BANNER",
                        }
                      : { ...img, imageType: "BANNER" }
                  )}
                />
              )}
            </div>
          </>
        ) : activeTab === "menu" ? (
          <MenuSection isTablet={isTablet} />
        ) : (
          <AccountPage />
        )}
      </div>
    </div>
  );
};

export default BoothForm;
