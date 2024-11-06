"use client";
import { useSpring, animated, useInView } from "react-spring";

import { usestackBlockStore } from "@/store/portfolio/stackBlock.store";




export const TextDescr = () => {
  const [ref, inView] = useInView({ once: true});

  const animstyle = useSpring({
    reset: true,
    from: { opacity: 0, transform: "translate3d(0,-20px,0)" },
    to: { opacity: 1, transform: "translate3d(0,0px,0)"},
    config: { tension: 10, friction: 7 }})
  const stackTextDescr = usestackBlockStore((state) => state.selectedDescr);

  return <animated.div ref={ref} style={animstyle}>{inView&&stackTextDescr}</animated.div>;
};
