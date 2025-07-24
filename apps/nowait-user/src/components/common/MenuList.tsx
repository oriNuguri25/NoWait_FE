import { useQuery } from "@tanstack/react-query";
import type { MenuType } from "../../types/order/menu";
import MenuItem from "./MenuItem";
import { useParams } from "react-router-dom";
import { getStoreMenus } from "../../api/menu";

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
    name: "갈비구이",
    description:
      "갈비를 달콤하고 고소한 비법 간장 양념에 재워 촉촉하게 구운 꿀조합 술 안주",
    price: 9200,
    image: "/beef.png",
  },

  {
    id: "4",
    name: "파인애플 샤베트",
    description: "시원한 파인애플 샤베트 입니다.",
    price: 9000,
    image: "",
  },

  {
    id: "5",
    name: "해물파전",
    description: "해물 별로 안들어간 해물파전 입니다.",
    price: 15000,
    image: "",
  },
];

const MenuList = ({ mode }: { mode: string }) => {
  const { id: storeId } = useParams();
  console.log(storeId, "스토어아이디");
  const { data } = useQuery({
    queryKey: ["storeMenus", storeId],
    queryFn: () => getStoreMenus(storeId),
    select:(data)=>data.response
  });
  console.log(data);
  return (
    <div className="mt-7.5">
      <h1 className="text-title-20-semibold mb-3">메뉴</h1>
      <ul>
        {dummyData.map((data: MenuType) => {
          return <MenuItem key={data.id} data={data} mode={mode} />;
        })}
      </ul>
    </div>
  );
};

export default MenuList;
