"use client";

import { Props } from "@/app/blog/View/RightCol/RightCol";

import { useNewPost, usePublishNewPost } from "@/store/blog/new.store";



import { variant } from "../../../../store/blog/new.store";



const ButtonNewPost: React.FC = () => {
  const publishNewPost = usePublishNewPost();
  const newPostStore = useNewPost();

  return (
    
      <>
        <button
          onClick={() => publishNewPost.fetch()}
          disabled={
            publishNewPost.loading || publishNewPost.finish ? true : false
          }
          type="button"
          className="w-full text-white transition-all bg-teal-500 hover:bg-teal-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          {publishNewPost.loading ? (
            <>Загрузка</>
          ) : publishNewPost.error ? (
            <>Ошибка</>
          ) : publishNewPost.finish ? (
            <>Опубликовано</>
          ) : (
            <>Опубликовать</>
          )}
        </button>
        <button
          onClick={() => {
            newPostStore.setVariant(variant.Editor);
          }}
          disabled={
            publishNewPost.loading || publishNewPost.finish ? true : false
          }
          type="button"
          className="w-full text-white transition-all bg-teal-500 hover:bg-teal-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Изменить
        </button>
      </>
    )

};

export default ButtonNewPost;
