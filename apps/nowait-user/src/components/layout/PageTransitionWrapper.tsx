import { motion } from "framer-motion";
import { useLocation, useNavigationType } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./transition.css";
import { useEffect, useRef, useState } from "react";

interface PropsType {
  children: React.ReactNode;
}

const PageTransitionWrapper = ({ children }: PropsType) => {
  return <div>{children}</div>;
};

export default PageTransitionWrapper;
