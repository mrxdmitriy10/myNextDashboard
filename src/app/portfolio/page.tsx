"use client";

import { BlockRoad } from "../components/Portfolio/BlockRoad";
import { BlockStack } from "../components/Portfolio/BlockStack";
import { TextDescr } from "../components/Portfolio/BlockStack/TextDescr";



const Page = () => {




  return (


      <div className="bg-gradient-to-b from-green-900 to-gray-800 p-5 sm:p-16 flex flex-col gap-24 text-white">
        <div className="flex flex-wrap justify-end gap-10">
          <div className="gap-3 flex flex-col items-end">
            <div className="font-thin text-white text-4xl">
              Расширяю возможности
            </div>
            <div className="font-extralight text-cyan-200 text-4xl drop-shadow-sm">
              Повышаю качество
            </div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-3xl drop-shadow-lg text-fuchsia-100 p-10 font-extralight flex-col flex items-end w-full sm:w-auto">
            <h1 className="text-xl mt-96">Бахвалов Дмитрий</h1>
            <p className="text-md italic text-lime-400 drop-shadow-sm">
              Начинающий FrontEnd разработчик
            </p>
          </div>
        </div><div className="grid gap-16 grid-cols-3">
            <div className="flex col-span-3 xl:col-span-2 flex-col gap-8 w-full">
              <BlockStack />
            </div>

            <div className="sm:col-span-2 sm:col-start-2 col-start-1 col-span-3 xl:col-span-1 font-mono font-light text-start sm:text-start p-4 sm:p-0 ">
              <TextDescr />
            </div>
          </div><div className="flex flex-col gap-2 items-end">
            <div className="font-thin text-right">
              <div className="text-3xl w-full">Мои проекты</div>
              <div className="w-full">На которых я учился</div>
              <div className="w-full">портфолио 1</div>
            </div>
            <div className="flex flex-wrap gap-2 text-nowrap flex-row-reverse">
              ...
            </div>
          </div><div className="flex flex-col gap-10 text-center item-center m-2 xs:m-10">
            <BlockRoad />
          </div>
      </div>

  );
};

export default Page;
