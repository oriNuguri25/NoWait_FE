import EmptyPage from "../../../../components/EmptyPage";

const EmptyCart = () => {
  return (
    <EmptyPage
      mode="default"
      title={`아직 담긴 메뉴가 없어요.\n마음에 드는 메뉴를 담아주세요!`}
      buttonText="추가하기"
    />
  );
};

export default EmptyCart;
