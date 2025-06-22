import smile from "../../../assets/icon/smile.svg";

interface HomeCardProps {
  storeName: string;
  department: string;
  viewerCount: number;
  imageUrl?: string;
}

const HomeCard = ({
  storeName,
  department,
  viewerCount,
  imageUrl,
}: HomeCardProps) => {
  return (
    <div className="flex flex-col">
      <div className="rounded-[14px] aspect-square w-40 bg-gray-200">
        <img alt="card" src={imageUrl} className="w-full h-full object-cover" />
      </div>
      <div className="mt-2.5 pl-1 w-full text-start flex flex-col gap-0.5">
        <div className="text-title-18-bold text-black-90">{storeName}</div>
        <div className="text-13-regular text-black-90">{department}</div>
        <div className="flex flex-row gap-0.5 text-black-60 items-center">
          <img src={smile} alt="smile" className="icon-xs" />
          <div className="text-13-bold text-black-60">
            {viewerCount}명이 보는 중
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
