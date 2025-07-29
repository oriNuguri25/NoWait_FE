import { useQuery } from "@tanstack/react-query";
import type { MenuType } from "../../types/order/menu";
import MenuItem from "./MenuItem";
import { getStoreMenus } from "../../api/menu";


const MenuList = ({ storeId, mode }: { storeId:string | undefined | null, mode: string }) => {

  const { data } = useQuery({
    queryKey: ["storeMenus", storeId],
    queryFn: () => getStoreMenus(storeId),
    select:(data)=>data.response.menuReadDto
  });
  console.log(data)
  return (
    <div className="py-[30px]">
      <h1 className="text-title-20-semibold mb-3">메뉴</h1>
      <ul>
        {data && data?.map((data: MenuType) => {
          return <MenuItem key={data.menuId} data={data} mode={mode} />;
        })}
      </ul>
    </div>
  );
};

export default MenuList;