import Lottie from "lottie-react";
import LoadingCircleBlack from "../assets/lottie/loadingCircle_black.json";
import LoadingCircleWhite from "../assets/lottie/loadingCircle_white.json";
import LoadingDotsBlack from "../assets/lottie/loadingDots_black.json";
import LoadingDotsWhite from "../assets/lottie/loadingDots_white.json";

type LoadingType = "circleBlack" | "circleWhite" | "dotsBlack" | "dotsWhite";

const loders: Record<string, unknown> = {
  circleBlack: LoadingCircleBlack,
  circleWhite: LoadingCircleWhite,
  dotsBlack: LoadingDotsBlack,
  dotsWhite: LoadingDotsWhite,
};

interface PropsType {
  loadingType: LoadingType;
  size?: number;
  className?: string;
}

const LoadingSpinner = ({ loadingType, size = 80, className }: PropsType) => {
  const animationData = loders[loadingType];
  return (
    <div style={{ width: size, height: size }} className={className}>
      <Lottie animationData={animationData} className="w-full h-full" />
    </div>
  );
};

export default LoadingSpinner;
