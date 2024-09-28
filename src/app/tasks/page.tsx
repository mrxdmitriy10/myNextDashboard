'use client'

import iFocus from "@/types/iFocus";

import iTask from "@/types/iTasks";
import { Input } from "@/app/tasks/Input";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { iOnsubmit } from "@/types/iEvent";
import { Tasks } from "./Tasks";
import { DidBuy } from "../DidBuy";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { usePathname } from 'next/navigation'


interface propsType {


  //focus: iFocus,
  //onSubmit: iSubmit
}





const Page: React.FC<propsType> = () => {
  const [cats, setCats] = useState<[{ name: string }] | []>([])
  const [focusTask, setFocusTask] = useState<iFocus['id']>(null)
  const [tasks, setTasks] = useState<Record<string, iTask[]> | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {


    const fetchCatTasks = async () => {
      try {
        const res = await axios.get('/api/tasks/categories')
        setCats(res.data)
      }
      catch (error) {
        console.error('Ошибка при загрузке данных:', error); // Обработка ошибок
      } finally {
        setLoading(false); // Завершаем загрузку
      }
    }

    fetchCatTasks()
  }, [])







  return (
    <div className='text-center text-sm mt-10 lg:mx-1'>

      <div className="flex flex-wrap sm:flex-nowrap gap-10 flex-cols-3 my-10">
        {
          loading?<>Загрузка категорий</>:!cats.length?<>Категорий задач нет. Создайте</>:cats.map((i, index) => {


            return (
              <Tasks key={i.name} maxrow={25} tittle={i.name} />
            )
          })
        }

      </div>




    </div>
  )
}
export default Page