"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Link from 'next/link';
import { Card } from './Card';
import iPostBlog from '@/types/iPostBlog';
import FilterMenu from './FilterMenu';







export type selectcategorytype = string | null

const Page:React.FC = ({}):JSX.Element => {
    

    const [delState, setdelState] = useState<boolean>(false)
    const [posts_blog, setPosts_Blog] = useState<iPostBlog[]>([]);
    const [loading, setloading] = useState<boolean>(true);
    const [selectcategory, setselectCategory] = useState<selectcategorytype>(null)

    const fetchallposts = async () => {
      try {
        const res:{data:iPostBlog[]} = await axios.get('/api/blog')

        
        setPosts_Blog(res.data)
      }
      catch (error) {
        console.error('Ошибка при загрузке данных:', error); // Обработка ошибок
      } finally {
        setloading(false); // Завершаем загрузку
      }
    }

    const delPost= async (id:number) =>{

        try {
            const res = await axios.delete(`/api/blog/${id}`)

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

    
    const delDuplCat = ()=> {
      const mapcategories = posts_blog.map((i)=>{return i.category})
      return mapcategories.filter((item, index)=>{
        return mapcategories.indexOf(item)===index
      }) 
    }
    const catefories = delDuplCat()


    
    return ( 

        <div className='grid gap-5 lg:px-5'>

             <div  className="flex gap-x-3 justify-end font-mono text-sm">
                <div className="hover:text-blue-500">
                  <Link href='/blog/new'>Написать</Link>
                  </div>
                <div className={"hover:text-red-400" + (delState ? ' text-red-400' : '' )}>
                  <Link  href='' onClick={()=>{setdelState(true)}}>Удалить</Link>
                </div>
             </div>
            
            <div className='flex gap-x-3 text-sm justify-end items-center'>
                <FilterMenu data={catefories}  filter={{value: selectcategory, setValue: setselectCategory}} />
            </div>

            <div className="flex flex-wrap justify-center 2xl:justify-center ">
                {
                    loading ? <>Загрузка постов</> : !posts_blog.length?<>Блог пуст</>:posts_blog.map((i)=>{
                      if ((i.category==selectcategory) || !selectcategory)
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