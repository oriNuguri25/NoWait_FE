import HomeHeader from "../../../components/Header";
import IsBookmark from "../storeDetail/components/IsBookmark";

const dummyData = [
  {
    id: 1,
    image: "/bookmarkStoreImage.png",
    wait: "대기 0팀",
    store: "스페이시스",
    lesson: "바이오메카트로닉스공학과",
  },
  {
    id: 1,
    image: "/bookmarkStoreImage.png",
    wait: "대기 0팀",
    store: "스페이시스",
    lesson: "바이오메카트로닉스공학과",
  },
];

const BookmarkPage = () => {
  return (
    <div>
      <div className="px-5">
        <HomeHeader />
        <h1 className="mt-5 mb-4 text-title-20-bold text-black-90">
          북마크한 부스
        </h1>
        <ul>
          {dummyData.map((data) => {
            return (
              <li key={data.id} className="mb-6">
                <div className="relative top-0 right-0">
                  <img
                    className="w-full object-cover"
                    src={data.image}
                    alt="북마크한 주점 메인 이미지"
                  ></img>
                  <p className="absolute top-[12px] right-[12px] text-primary bg-[#ffe9df] px-2 py-[7px] font-bold text-[12px] rounded-[6px]">
                    {data.wait}
                  </p>
                </div>
                <div className="flex justify-between py-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      className="w-[40px] h-[40px] object-cover rounded-full bg-black-40"
                      src=""
                      alt="학과 메인 이미지"
                    ></img>
                    <div className="flex flex-col justify-between">
                      <h1 className="text-title-16-bold text-black-90">
                        {data.store}
                      </h1>
                      <h2 className="text-14-regular text-black-70">
                        {data.lesson}
                      </h2>
                    </div>
                  </div>
                  <IsBookmark />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default BookmarkPage;
