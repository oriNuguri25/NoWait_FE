import { useState } from "react";
import EmptyOrderDetails from "./components/EmptyOrderDetails";

const dummyData = [
  { id: 1, menu: "참치마요주먹밥 세트", quantity: 1 },
  { id: 2, menu: "해물파전", quantity: 2 },
  { id: 3, menu: "숙주보끔", quantity: 3 },
];

const OrderDetailsPage = () => {
    const [a,setA] = useState(false)
    if (a) return <EmptyOrderDetails/>
  return (
    <div>
      <div className="bg-black-15 min-h-screen py-[30px] px-5">
        <button onClick={()=>setA(!a)}>스위치</button>
        <h1 className="text-headline-24-bold mb-[23px] text-black-90">
          주문내역 <span className="text-primary">1건</span>
        </h1>
        <ul>
          <li className="p-[22px] bg-white rounded-[22px] mb-4">
            <div className="mb-7.5">
              <h1 className="text-title-20-bold text-black-90 mb-2">
                입금 확인 중
              </h1>
              <p className="text-14-regular text-black-60">
                2025년 7월 1일 19:49
              </p>
            </div>
            <ul className="border-b-1 border-[#ececec] pb-5 mb-5">
              {dummyData.map((data) => {
                return (
                  <li
                    key={data.id}
                    className="flex justify-between items-center mb-2.5 last:mb-0"
                  >
                    <h1 className="text-16-regular text-black-90">
                      {data.menu}
                    </h1>
                    <span className="text-16-regular text-black-60">
                      {data.quantity}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="flex justify-between items-center">
              <h1 className="text-16-semibold">결제금액</h1>
              <h2 className="text-16-semibold">36,000원</h2>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
