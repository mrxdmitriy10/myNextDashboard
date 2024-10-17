"use client";
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Link from "next/link";
import { Card } from "./Card";
import iPostBlog from "@/types/iPostBlog";
import FilterMenu from "./FilterMenu";
import { isAdmin } from "@/lib/isAdmin";
import { useSession } from "next-auth/react";
import { ModalDelete } from "./ModalDelete";
import { usedelStore, usepostsStore } from "@/store/blog/blog.store";

export type selectcategorytype = string | null;

const Page: React.FC = () => {
  // const [posts_blog, setPosts_Blog] = useState<iPostBlog[]>([]);
  const [loading, setloading] = useState<boolean>(true);
  const [selectcategory, setselectCategory] = useState<selectcategorytype>(null);

  const session = useSession();
  const delStore = usedelStore();
  const postsStore = usepostsStore();

  const fetchallposts = async () => {
    try {
      const res: { data: iPostBlog[] } = await axios.get("/api/blog");
      postsStore.setPosts(res.data)
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error); // Обработка ошибок
    } finally {
      setloading(false); // Завершаем загрузку
    }
  };

  useEffect(() => {
    fetchallposts();
  }, []);

  const delDuplCat = () => {
    const mapcategories = postsStore.all.map((i) => { return i.category })
    return mapcategories.filter((item, index) => {
      return mapcategories.indexOf(item) === index
    })
  }
  const categories = delDuplCat()

  return (
    <div className="grid gap-5 lg:px-5">
      <ModalDelete fetchallposts={fetchallposts} />

      {isAdmin(session) &&
        <div className="flex gap-x-3 justify-end font-mono text-sm">
          <div className="hover:text-blue-500">
            <Link href='/blog/new'>Написать</Link>
          </div>
          <div className={"hover:text-red-400" + (delStore.delState ? ' text-red-400' : '')}>
            <Link href='' onClick={() => { delStore.setdelState(true) }}>Удалить</Link>
          </div>
        </div>
        } 

      <div className="flex gap-x-3 text-sm justify-end items-center">
        <FilterMenu data={categories} />
      </div>

      <div className="flex flex-wrap justify-center 2xl:justify-center ">
        {
          loading ? <>Загрузка постов</> : !postsStore.all.length ? <>Блог пуст</> : postsStore.all.map((i) => {
            if ((i.category == selectcategory) || !selectcategory)
              return <Card key={i.id} id={i.id} autor={i.autor} tittle={i.tittle}
                date={i.date} content={i.content} category={i.category}
                img={i.img}
              />
          })
        }
      </div>
    </div>
  );
};
export default Page;
