"use client";

import { useEffect } from "react";

import { CategoryStack } from "./categoryStack";
import { usestackBlockStore } from "@/store/portfolio/stackBlock.store";
import { animated, useInView, useSpring } from "react-spring";





/**
 * Компонент BlockStack отображает анимированный блок стеков категорий.
 * При монтировании вызывает fetchData из usestackBlockStore для загрузки данных стека.
 * Использует react-spring для анимации видимости элементов на основе inView.
 * Отображает уникальные категории и соответствующие элементы через CategoryStack.
 */
export const BlockStack = () => {

  const [ref, inView] = useInView({ once: true });

  const stackBlockStore = usestackBlockStore();
  useEffect(() => {
    stackBlockStore.fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animstyle = useSpring({
    opacity: 0, transform: "translate3d(0,-40px,0)",
    to: {opacity: inView?1:0, transform: inView?"translate3d(0,0px,0)":"translate3d(0,-40px,0)"},
    config: { tension: 200, friction: 100 },
  })
  return (
    <>
      <div className="font-thin">
        <div className="text-3xl w-full">Мой стек</div>
        <div className="w-full">Который я использую</div>
      </div>

      <animated.div style={animstyle} ref={ref} className="flex flex-col gap-3 ">
        {stackBlockStore.data
          ?.reduce<string[]>((accum, item) => {
            // Проверяем, является ли category строкой и содержится ли она в accum
            if (!accum.includes(item.category)) {
              accum.push(item.category); // Если нет, добавляем его
            }
            return accum; // Возвращаем аккумулятор для следующей итерации
          }, [])
          .map((category) => (
            <CategoryStack
              key={category} // Добавьте уникальный ключ для каждого элемента списка
              name={category}
              // Выбираем только те items, category которых совпадает с текущей
              values={stackBlockStore.data
                ?.filter((item) => item.category === category)
                .map((item) => item.name)}
            />
          ))}

      </animated.div>
    </>
  );
};
