import EmptyPage from "../../../../components/EmptyPage";

const EmptyOrderDetails = () => {
  return (
    <EmptyPage
      mode="orderDetails"
      title={`주문 내역이 없습니다.\n첫 주문을 시작해 보세요.`}
      buttonText="주문하기"
    />
  );
};

export default EmptyOrderDetails;
