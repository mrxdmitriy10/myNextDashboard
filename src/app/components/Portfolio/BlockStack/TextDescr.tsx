"use client";
import { useSpring, animated, useInView } from "react-spring";

import { usestackBlockStore } from "@/store/portfolio/stackBlock.store";




export const TextDescr = () => {
  // Создаем реф для отслеживания видимости элемента и получаем состояние его видимости
  const [ref, inView] = useInView({ once: true });

  // Используем useSpring для анимации, начинающейся с непрозрачности и смещения
  const animstyle = useSpring({
    reset: true, // Сбрасываем анимацию при каждом изменении параметров
    from: { opacity: 0, transform: "translate3d(0,-20px,0)" }, // Начальное состояние анимации
    to: { opacity: 1, transform: "translate3d(0,0px,0)" }, // Конечное состояние анимации
    config: { tension: 10, friction: 7 } // Конфигурация анимации: натяжение и трение
  });

  // Получаем выбранное описание из состояния магазина stackBlock
  const stackTextDescr = usestackBlockStore((state) => state.selectedDescr);

  // Возвращаем анимированный div, который отображает текст описания только если он в поле зрения
  return (
    <animated.div ref={ref} style={animstyle}>
      {inView && stackTextDescr}
    </animated.div>
  );
};
