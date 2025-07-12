import { useNavigate, useParams } from "react-router-dom";
import type { MenuType } from "../../types/order/menu";

const dummyData: MenuType[] = [
  {
    id: "1",
    name: "우리 학과 최고의 자랑거리 메뉴인 숙주 삼결살 볶음 입니다.",
    description:
      "숙주 삼겹살에 대한 메뉴 설명입니다.숙주 삼겹살에 대한 메뉴 설명입니다.",
    price: 12000,
    image: "",
  },
  {
    id: "2",
    name: "과일 화채",
    description: "시원한 과일 화채 입니다.",
    price: 10000,
    image: "",
  },
  {
    id: "3",
    name: "파인애플 샤베트",
    description:
      "시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.",
    price: 92341,
    image: "",
  },
  {
    id: "4",
    name: "파인애플 샤베트2",
    description:
      "시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.",
    price: 9000,
    image: "",
  },
  {
    id: "5",
    name: "파인애플 샤베트3",
    description:
      "시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.시원한 파인애플 샤베트 입니다.",
    price: 9000,
    image: "",
  },
];

const MenuList = ({ mode }: { mode?: string }) => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  return (
    <div>
      <h1 className="text-title-20-semibold mb-3">메뉴</h1>
      <ul>
        {dummyData.map((data) => {
          return (
            <li key={data.id} className="mb-5">
              <button
                onClick={() =>
                  navigate(`/${storeId}/menu/${data.id}`, { state: data })
                }
                className="w-full flex justify-between cursor-pointer text-left"
              >
                <div className="max-w-[224px]">
                  <h2
                    className={`${
                      mode === "order"
                        ? "text-title-18-semibold"
                        : "text-title-16-bold"
                    } text-black-90 mb-1 text-ellipsis line-clamp-2`}
                  >
                    {data.name}
                  </h2>
                  <h2 className="text-black-70">
                    {data.price.toLocaleString()}원
                  </h2>
                </div>
                <img
                  className="w-[90px] h-[90px] bg-black-25 rounded-[12px]"
                  src={`${data.image}` || ""}
                  alt="음식 메뉴 이미지"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MenuList;
