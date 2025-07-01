import closeIcon from "../assets/close.svg";
interface CloseButtonProps {
  onClick?: () => void | undefined;
}

const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <button onClick={onClick}>
      <img
        src={closeIcon}
        width="11px"
        height="11px"
        alt="닫기 아이콘"
        className="hover:brightness-[110%] cursor-pointer"
      />
    </button>
  );
};

export default CloseButton;
