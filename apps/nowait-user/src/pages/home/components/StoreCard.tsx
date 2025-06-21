import { NotOpenIcon, WaitingIcon } from "./HomeIcon";

interface StoreCardProps {
  storeName: string;
  department: string;
  status: "open" | "closed";
  waitingCount?: number;
  imageUrl?: string;
}

const StoreCard = ({
  storeName,
  department,
  status,
  waitingCount,
  imageUrl,
}: StoreCardProps) => {
  return (
    <div className="flex flex-row py-3 gap-3 w-full min-w-0 items-center">
      <div className="rounded-full w-11 h-11 bg-gray-200 flex-shrink-0">
        <img
          alt="store"
          src={imageUrl}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex flex-row gap-2 items-center min-w-0">
          <div className="text-title-16-bold text-black-90 text-start truncate flex-shrink min-w-0">
            {storeName}
          </div>
          <div className="flex-shrink-0">
            {status === "open" ? (
              <WaitingIcon waitingCount={waitingCount} />
            ) : (
              <NotOpenIcon />
            )}
          </div>
        </div>
        <div className="flex text-13-regular text-black-70 text-start">
          {department}
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
