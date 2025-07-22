import Back from "../../assets/icon/back.svg?react";

interface PropsType {
  title: string;
}

const Header = ({ title }: PropsType) => {
  return (
    <div>
      <div className="flex justify-between items-center px-5 py-2.5">
        <button>
          <Back />
        </button>
        <h1 className="text-title-16-bold">{title}</h1>
        <div className="w-2.5"></div>
      </div>
    </div>
  );
};

export default Header;
