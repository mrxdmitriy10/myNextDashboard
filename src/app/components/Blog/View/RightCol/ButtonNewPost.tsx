"use client";



import { useNewPost } from "@/store/blog/newPost.store";



import { variant } from "@/store/blog/newPost.store";



const ButtonNewPost: React.FC = () => {

  const newPostStore = useNewPost();

  return (
    
      <div>
        <button
          onClick={() => newPostStore.fetch()}
          disabled={
            newPostStore.loading || newPostStore.finish ? true : false
          }
          type="button"
          className="w-full text-white transition-all bg-teal-500 hover:bg-teal-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          {newPostStore.loading ? (
            <>Загрузка</>
          ) : newPostStore.error ? (
            <>Ошибка</>
          ) : newPostStore.finish ? (
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
            newPostStore.loading || newPostStore.finish ? true : false
          }
          type="button"
          className="w-full text-white transition-all bg-teal-500 hover:bg-teal-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Изменить
        </button>
      </div>
    )

};

export default ButtonNewPost;
