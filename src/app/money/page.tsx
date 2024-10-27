"use client";

import { DidBuy } from "../components/Money/DidBuy";

import { ibuyMoney, idelMoneyItem } from "@/types/iEvent";
import ItemMoney from "../components/Money/Item";
import iItemMoney from "@/types/iItemMoney";
import { useEffect, useState } from "react";
import axios from "axios";

const Page: React.FC = () => {
  const [moneyitems, setMoneyitems] = useState<iItemMoney[]>([]);

  const [didBuy, setdidBuy] = useState<string[]>([]);

  const [focusTask, setFocusTask] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/didbuyitems")
      .then((res) => setdidBuy(res.data));

    axios
      .get("http://localhost:5000/moneyitems")
      .then((res) => setMoneyitems(res.data));
  });

  const buyMoney = (e: ibuyMoney) => {
    axios
      .get("http://localhost:5000/buyitem/" + e.currentTarget.id)
      .then((res) => {
        setMoneyitems(res.data.moneyitems);
        setdidBuy(res.data.didBuyitems);
      });
  };

  const delMoneyItem = (e: idelMoneyItem) => {
    const fetch = async () => {
      e.preventDefault();

      try {
        const res = await axios.get(
          "http://localhost:5000/delitem/" + e.currentTarget.id
        );
        setMoneyitems(await res.data);
      } catch {
        return;
      }
    };
    fetch();
  };

  return (
    <div className="text-center grid grid-cols-1 lg:grid-cols-2 w-auto mx-5">
      <div className="">
        <div className=" shadow-md sm:rounded-lg w-full text-sm text-gray-500 drak:text-gray-400">
          <div className="p-2 w-full text-right grid grid-cols-5 gap-1 text-xs text-gray-700 uppercase bg-gray-50 drak:bg-gray-700 drak:text-gray-400">
            <div></div>
            <div></div>
            <div className="">На что</div>
            <div className="">Сколько</div>
            <div className="">Действие</div>
          </div>
          <div className="w-full select-none">
            {moneyitems.map((i, index) => {
              return (
                <ItemMoney
                  key={index}
                  index={index}
                  img={i.img}
                  name={i.name}
                  amount={i.amount}
                  actions={{ buy: buyMoney, del: delMoneyItem }}
                />
              );
            })}
          </div>
        </div>
        <div className="pl-32 text-gray-700 m-2 mx-10 text-right ">
          <p className="text-4xl font-bold">
            Мне нужны денежки, чтобы купить это
          </p>
        </div>
      </div>

      <div>
        <p>Я уже купил</p>
        <p className="text-gray-700 mx-auto m-8 text-sm">
          {didBuy.map((i, index) => (
            <DidBuy
              key={index}
              item={i}
              focus={{ id: focusTask, set_focus: setFocusTask }}
            />
          ))}
        </p>
      </div>
    </div>
  );
};

export default Page;
