"use client"
import React, { useState } from 'react';


import axios from 'axios';


import { useEffect } from 'react';

import Link from 'next/link';
import { Card } from './Card';

import iPostBlog from '@/types/iPostBlog';








const Page:React.FC = ({}):JSX.Element => {
    

    const [delState, setdelState] = useState<boolean>(false)

    const [posts_blog, setPosts_Blog] = useState<iPostBlog[]>([]);
    const [Loading, setLoading] = useState<boolean>(true);

    const fetchallposts = async () => {
      try {
        const res:{data:iPostBlog[]} = await axios.get('/api/blog')
        console.log(res.data);
        
        setPosts_Blog(res.data)
      }
      catch (error) {
        console.error('Ошибка при загрузке данных:', error); // Обработка ошибок
      } finally {
        setLoading(false); // Завершаем загрузку
      }
    }

    const delPost= async (id:number) =>{

        try {
            const res = await axios.delete(`/api/blog/${id}`)
            console.log(res.data);
          }
          catch (error) {
            console.error(`Ошибка при удалении поста: ${id}`, error); // Обработка ошибок
          } finally {
            fetchallposts()
          }
      }


    useEffect(() => {
        fetchallposts()
    }, []);
    


        
    return ( 

        <div>

             <div  className="flex gap-x-3 w-36 mr-0 m-auto font-mono text-sm">

                <Link href='/blog/new' className="hover:text-blue-500">Написать</Link>
                <Link className={"hover:text-red-400" + (delState ? ' text-red-400' : '' )} href='' onClick={()=>{setdelState(true)}}>Удалить</Link>


             </div>

            <div className="flex mt-5 flex-wrap justify-end items-center">
                {
                    Loading ? <>Загрузка постов</> : !posts_blog.length?<>Блог пуст</>:posts_blog.map((i)=>{
                      return <Card key={i.id} id={i.id} autor={i.autor} tittle={i.tittle} 
                                    date={i.date} content={i.content} category={i.category} 
                                    img={i.img} 
                                    del={{state: delState, set: setdelState, action: delPost}}
                                    /> })
                    }
                
            </div>
        </div>



)

}
export default Page