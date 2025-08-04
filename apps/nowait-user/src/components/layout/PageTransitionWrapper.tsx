import "./transition.css";

interface PropsType {
  children: React.ReactNode;
}

const PageTransitionWrapper = ({ children }: PropsType) => {
  return <div>{children}</div>;
};

export default PageTransitionWrapper;
