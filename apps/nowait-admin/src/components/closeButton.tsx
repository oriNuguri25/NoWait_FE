import closeIcon from "../assets/close.svg";
interface CloseButtonProps {
  onClick?: () => void | undefined;
}

const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <button onClick={onClick}>
      <img src={closeIcon} width="11px" height="11px" />
    </button>
  );
};

export default CloseButton;
