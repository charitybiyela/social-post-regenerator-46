
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  // We're disabling the automatic scroll to top behavior
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  return null;
};

export default ScrollToTop;
