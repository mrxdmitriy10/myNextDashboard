"use client";
import React from "react";
import { animated, useInView, useSpring } from "react-spring";

export const BlockRoad = () => {
  const [ref, inView] = useInView({ once: true });

  const animationStyle = useSpring({
    opacity: 0,
    transform: "translate3d(0,-40px,0)",
    to: {
      opacity: inView ? 1 : 0,
      transform: inView ? "translate3d(0,0px,0)" : "translate3d(0,-40px,0)",
    },
    config: { tension: 50, friction: 100 },
  });

  return (
    <>
      <div className="font-thin">
        <div className="text-4xl w-full">Мой путь</div>
        <div className="">Который я прошел</div>
      </div>
      <animated.div
        ref={ref}
        style={animationStyle}
        className="flex flex-col gap-10 font-extralight"
      >
        <div className="text-2xl">Юность</div>
        <div>
          В школе я знакомился с основами программирования. Начинал с Pascal.
          <br />
          Изучал прикладное ПО - Photoshop и основы 3д моделирования
          <br />
          Многократно посещал летний лагерь с уклоном в обучении
          программированию. Был преуспевающим учеником
          <br />
          Позднее начал углубляться в php, html, css... уже вовсю пользовался
          bootstrap
          <br />
          Тренировался на верстке лендингов
        </div>
      </animated.div>

      <animated.div
        ref={ref}
        style={animationStyle}
        className="flex flex-col gap-10 font-extralight"
      >
        <div className="text-2xl">Карьера</div>
        <div>
          Свою карьеру я начал в газодобывающей промышленности
          <br />
          Работал на компрессорных станциях, познавал труд и дисциплину
          <br />
          В моей работе я учился решению логических задач и развивал soft
          skill&apos;s
          <br />В качестве хобби интересовался javascript и пробовал на вкус
          React
        </div>
      </animated.div>

      <animated.div
        ref={ref}
        style={animationStyle}
        className="flex flex-col gap-10 font-extralight"
      >
        <div className="text-2xl">Инженеринг</div>
        <div>
          И вот я уже инженер на пищевом производстве
          <br />
          Внедряю проекты по улучшению автоматизации производства
          <br />
          Конфигурирую и разрабатываю ПО контроллеров САУ
          <br />
        </div>
      </animated.div>
    </>
  );
};
