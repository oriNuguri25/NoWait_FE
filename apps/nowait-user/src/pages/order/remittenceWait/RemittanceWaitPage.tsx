import { useLocation, useNavigate, useParams } from "react-router-dom";
import PageFooterButton from "../../../components/order/PageFooterButton";
import { Button } from "@repo/ui";
import { useCartStore } from "../../../stores/cartStore";
import { sumTotalPrice } from "../../../utils/sumUtils";
import { createOrder } from "../../../api/order";

const RemittanceWaitPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const payer = location.state;
  const { storeId } = useParams();
  const tableId = localStorage.getItem("tableId");
  const { cart, clearCart } = useCartStore();
  const totalPrice = sumTotalPrice(cart);

  const orderButton = async () => {
    try {
      const payload = {
        depositorName: payer,
        items: cart.map((item) => ({
          menuId: item.menuId,
          quantity: item.quantity,
        })),
        totalPrice,
      };
      const res = await createOrder(storeId!, tableId!, payload);
      if (res?.success) {
        //세션 아이디, 입금자명 로컬스토리지 저장
        localStorage.setItem("depositorName", res.response.depositorName);
      }
      //장바구니 비우기
      clearCart();
    } catch (error) {
      console.log(error);
    }
    navigate(`/${storeId}/order/success`);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 flex-col justify-center items-center text-center overflow-y-auto px-5">
        <img
          className="mb-2.5 w-[210px] h-[210px] bg-black-25"
          src=""
          alt="이체 대기중인 이미지"
        />
        <h1 className="text-headline-24-bold mb-2">이체가 진행되고 있어요</h1>
        <h2 className="whitespace-pre-line text-16-regular text-black-70 mb-3.5">
          아직 주문이 완료되지 않았어요
          <br />
          이체를 완료하셨다면 버튼을 눌러주세요
        </h2>
      </div>

      <PageFooterButton>
        <Button textColor="white" onClick={orderButton}>
          이체했어요
        </Button>
      </PageFooterButton>
    </div>
  );
};

export default RemittanceWaitPage;
