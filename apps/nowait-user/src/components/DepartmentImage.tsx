import DefaultDepartmentImage from "../assets/default-department.png";

interface PropsType {
  width: string;
  height: string;
  src?: string;
}
const DepartmentImage = ({ width, height, src }: PropsType) => {
  console.log("학과 이미지=>",src)
  return (
      <img
        className={`object-cover w-[${width}] h-[${height}] rounded-full`}
        src={src || DefaultDepartmentImage}
        alt="학과 대표 이미지"
      />
  );
};

export default DepartmentImage;
