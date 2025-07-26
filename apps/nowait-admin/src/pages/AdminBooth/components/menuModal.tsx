import { useState } from "react";
import placeholderIcon from "../../../assets/image_placeholder.svg";
import closeIcon from "../../../assets/close.svg";
interface MenuModalProps {
  isEdit: boolean;
  initialData?: {
    name: string;
    adminName: string;
    price: string;
    description: string;
    isRepresentative: boolean;
    image?: File;
  };
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const MenuModal = ({
  isEdit,
  initialData,
  onClose,
  onSubmit,
}: MenuModalProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [adminName, setAdminName] = useState(initialData?.adminName || "");
  const [price, setPrice] = useState(initialData?.price || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [isRepresentative, setIsRepresentative] = useState(
    initialData?.isRepresentative || false
  );
  const [image, setImage] = useState<File | null>(initialData?.image || null);

  const handleSubmit = () => {
    onSubmit({ name, adminName, price, description, isRepresentative, image });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] h-[754px] rounded-[20px] p-[30px] relative">
        <div className="flex justify-between w-full">
          <h2 className="text-title-20-bold mb-[30px]">
            {isEdit ? "메뉴 편집하기" : "새 메뉴 추가하기"}
          </h2>
          <img
            src={closeIcon}
            alt="닫기"
            className="w-5 h-5"
            onClick={onClose}
          />
        </div>

        {/* 대표 메뉴 토글 */}
        <div className="flex justify-between items-center mb-[30px]">
          <span className="text-title-20-bold">대표 메뉴 설정</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isRepresentative}
              onChange={() => setIsRepresentative((prev) => !prev)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition-all"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
          </label>
        </div>

        {/* 메뉴명 */}
        <div className="mb-[30px] flex gap-[20px]">
          <div className="flex flex-col w-full ">
            <label className="block text-sm font-medium mb-3">메뉴명</label>
            <div className="relative w-full">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={20}
                className="w-full h-[52px] border border-[#DDDDDD] bg-black-5 bg-black-5 focus:bg-white px-4 py-2 border rounded-lg text-sm"
                placeholder="메뉴명을 입력해주세요"
              />
              <p
                className={`absolute top-1/2 -translate-y-1/2 right-4 text-13-regular text-gray-400 `}
              >
                <span
                  className={`${
                    name.length > 0 ? "text-black" : "text-gray-400"
                  }`}
                >
                  {name.length}
                </span>{" "}
                / 20
              </p>
              {/* 이미지 업로드 */}
            </div>
          </div>
          <label className="min-w-[86px] min-h-[86px] bg-black-5 border border-[#DDDDDD] rounded-lg flex items-center justify-center cursor-pointer overflow-hidden">
            <input
              type="file"
              className="hidden"
              onChange={(e) => e.target.files && setImage(e.target.files[0])}
            />
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="업로드된 이미지"
                className="w-full h-full object-cover"
              />
            ) : (
              <img src={placeholderIcon} className="w-6 h-6" alt="업로드" />
            )}
          </label>
        </div>

        {/* 관리자용 메뉴명 */}
        <div className="mb-[30px] relative">
          <label className="block text-sm font-medium mb-3">
            관리자용 메뉴명
          </label>
          <div className="relative">
            <input
              type="text"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              maxLength={10}
              className="w-full h-[52px] border border-[#DDDDDD] bg-black-5 bg-black-5 focus:bg-white px-4 py-2 border rounded-lg text-sm"
              placeholder="주문 확인에 용이한 메뉴명으로 설정해주세요."
            />
            <p className="absolute top-1/2 -translate-y-1/2 right-4 text-13-regular text-gray-400">
              <span
                className={` ${
                  adminName.length > 0 ? "text-black" : "text-gray-400"
                }`}
              >
                {adminName.length}
              </span>{" "}
              / 10
            </p>
          </div>
        </div>

        {/* 가격 */}
        <div className="mb-[30px]">
          <label className="block text-sm font-medium mb-3">가격</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full h-[52px] border border-[#DDDDDD] bg-black-5 bg-black-5 focus:bg-white px-4 py-2 border rounded-lg text-sm"
            placeholder="가격을 입력해주세요"
          />
        </div>

        {/* 메뉴 소개 */}
        <div className="mb-[30px] relative">
          <label className="block text-sm font-medium mb-3">메뉴 소개</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={250}
            className="w-full border border-[#DDDDDD] bg-black-5 bg-black-5 focus:bg-white h-[120px] px-4 py-2 border rounded-lg text-sm h-24"
            placeholder="메뉴 소개를 입력해주세요."
          />
          <p className="absolute bottom-[12px] right-4 text-right text-xs text-gray-400">
            <span
              className={`${
                description.length > 0 ? "text-black" : "text-gray-400"
              }`}
            >
              {description.length}
            </span>{" "}
            / 250
          </p>
        </div>

        {/* 하단 버튼 */}
        <div className="flex">
          <button
            onClick={handleSubmit}
            className="w-full h-[48px] px-3 py-[10px] rounded-[10px] bg-black text-white text-sm"
          >
            {isEdit ? "저장하기" : "메뉴 추가하기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
