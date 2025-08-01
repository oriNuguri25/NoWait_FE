import React from "react";
import editIcon from "../../../assets/edit_icon.svg";
import booth_thumbnail from "../../../assets/booth_thumbnail.svg";
import type { ProfileImage } from "../types/booth";

const BoothProfileImage = ({
  profileImage,
  setProfileImage,
}: {
  profileImage: ProfileImage;
  setProfileImage: React.Dispatch<React.SetStateAction<ProfileImage>>;
}) => {
  const getImageSrc = (): string => {
    if (profileImage instanceof File) {
      return URL.createObjectURL(profileImage);
    }
    if (
      profileImage &&
      typeof profileImage === "object" &&
      "imageUrl" in profileImage
    ) {
      return profileImage.imageUrl;
    }
    return booth_thumbnail;
  };
  return (
    <div className="relative self-start">
      <div className="h-25 w-25 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
        {profileImage ? (
          <img
            src={getImageSrc()}
            alt="프로필 미리보기"
            className="object-cover w-full h-full"
          />
        ) : (
          <img
            src={booth_thumbnail}
            alt="썸네일"
            className="object-cover w-full h-full"
          />
        )}
      </div>
      <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 border border-[#ECECEC] cursor-pointer">
        <img src={editIcon} className="w-4 h-4" alt="편집" />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setProfileImage(e.target.files[0]);
            }
          }}
        />
      </label>
    </div>
  );
};

export default BoothProfileImage;
