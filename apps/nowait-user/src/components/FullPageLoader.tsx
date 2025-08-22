import LoadingSpinner from "./LoadingSpinner";

type LoadingType = "circleBlack" | "circleWhite" | "dotsBlack" | "dotsWhite";

interface FullPageLoaderProps {
  loadingType?: LoadingType;
}

const FullPageLoader = ({
  loadingType = "circleBlack",
}: FullPageLoaderProps) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoadingSpinner loadingType={loadingType} />
    </div>
  );
};

export default FullPageLoader;
