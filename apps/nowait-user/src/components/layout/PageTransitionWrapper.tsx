import { motion } from "framer-motion";
import { useLocation, useNavigationType } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./transition.css";
import { useEffect, useRef, useState } from "react";

interface PropsType {
  children: React.ReactNode;
}

const PageTransitionWrapper = ({ children }: PropsType) => {
  const pathname = location.pathname;
  const navigateType = useNavigationType();
  const nodeRef = useRef(null);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState("fadeIn");
  useEffect(() => {
    setTransitionStage("fadeOut");

    const timeout = setTimeout(() => {
      setDisplayChildren(children);
      setTransitionStage("fadeIn");
    }, 300); // duration of your CSS transition

    return () => clearTimeout(timeout);
  }, [location.pathname]); // 🔁 페이지 바뀔 때만

  return (
    <div className={`page-wrapper ${transitionStage}`}>{displayChildren}</div>
  );
};

export default PageTransitionWrapper;
