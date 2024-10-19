"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Card } from "./Card";

import FilterMenu from "./FilterMenu";
import { isAdmin } from "@/lib/isAdmin";
import { useSession } from "next-auth/react";
import { ModalDelete } from "./ModalDelete";
import { usedelStore, usepostsStore } from "@/store/blog/blog.store";

export type selectcategorytype = string | null;

const Page: React.FC = () => {
  // const [posts_blog, setPosts_Blog] = useState<iPostBlog[]>([]);

  const session = useSession();
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

      <div className="flex gap-x-3 text-sm justify-end items-center">
        <FilterMenu data={categories} />
      </div>

      <div className="flex gap-4 flex-wrap justify-center 2xl:justify-stretch ">
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
              return (
                <Card
                  key={i.id}
                  post={i}
                />
              );
          })
        )}
      </div>
    </div>
  );
};
export default Page;
