"use client";
import Link from "next/link";
import { Card } from "../components/Blog/Card";

import FilterMenu from "../components/Blog/FilterMenu";
import { isAdmin } from "@/lib/isAdmin";

import { usepostsStore } from "@/store/blog/blog.store";
import { useSession } from "next-auth/react";

import { useEffect } from "react";
import { usedelStore } from "@/store/blog/delPost.store";
import { ModalDelete } from "../components/Blog/ModalDelete";


const Page: React.FC = () => {
  const session = useSession().data;
  const delStore = usedelStore();
  const postsStore = usepostsStore();

  useEffect(() => {
    postsStore.fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const delDuplCat = () => {
    const mapcategories = postsStore.all.map((i) => {
      return i.category;
    });
    return mapcategories.filter((item, index) => {
      return mapcategories.indexOf(item) === index;
    });
  };
  const categories = delDuplCat();

  return (
    <div className="grid gap-5 lg:px-5">
      <div className="w-96 font-serif text-gray-400 text-right m-auto mr-0 -mt-10 sm:-mt-20 z-20">
        &quot;Но когда живое существо обретает знание, свет этого знания
        рассеивает тьму неведения и открывает ему истинную природу вещей,
        подобно тому как солнце, поднимаясь над горизонтом, озаряет все вокруг.
        &quot;
      </div>
      <ModalDelete />

      {isAdmin(session) && (
        <div className="flex gap-x-3 justify-end font-mono text-sm">
          <div className="hover:text-blue-500">
            <Link href="/blog/new">Написать</Link>
          </div>
          <div
            className={
              "hover:text-red-400" + (delStore.delState ? " text-red-400" : "")
            }
          >
            <Link
              href=""
              onClick={() => {
                delStore.setdelState(true);
              }}
            >
              Удалить
            </Link>
          </div>
        </div>
      )}

      <div className="flex gap-x-3 text-sm justify-end p-5 sticky top-0 z-10">


        <FilterMenu data={categories} />
      </div>
      <div className="flex">
        <div className="inline-flex gap-6 flex-wrap justify-center m-auto">
          {postsStore.error ? (
            <>Ошибка загрузки постов {postsStore.error}</>
          ) : postsStore.loading ? (
            <>Загрузка постов</>
          ) : !postsStore.all.length ? (
            <>Блог пуст</>
          ) : (
            postsStore.all.map((i) => {
              if (
                i.category == postsStore.selectCategory ||
                !postsStore.selectCategory
              )
                return <Card key={i.id} post={i} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};
export default Page;
