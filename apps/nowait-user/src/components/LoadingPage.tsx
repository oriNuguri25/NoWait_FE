import LoadingSpinner from "../assets/loading_black.gif";

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center min-h-full">
      <img src={LoadingSpinner} />
    </div>
  );
};

export default LoadingPage;
