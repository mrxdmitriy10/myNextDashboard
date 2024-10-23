'use client'


import React, { useEffect, useState } from "react";
import axios from "axios";
import Tasks from "./Tasks";





const Page: React.FC = () => {



  const [cats, setCats] = useState<[{ name: string }] | []>([])
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
    <div className='text-center text-sm mt-10 lg:mx-1 -mx-0 sm:-mx-5 md:-mx-0'>

      <div className="flex flex-wrap sm:flex-nowrap gap-10 sm:gap-3 md:gap-5 xl:gap-10 flex-cols-3 my-10 justify-center">

        {
          loading?<>Загрузка категорий</>:!cats.length?<>Категорий задач нет. Создайте</>:cats.map((i) => {
            return (


                  <Tasks key={i.name} maxrow={100} tittle={i.name} />

             
            )
          })
        }

      </div>




    </div>
  )
}




export default Page