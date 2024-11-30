"use client";

import { Editor } from "primereact/editor";
import { Button } from "primereact/button";

import { FormEvent } from "react";
import View from "../../components/Blog/View/View";


import { isAdmin } from "@/lib/isAdmin";
import { variant, useNewPost } from "../../../store/blog/newPost.store";
import { useSession } from "next-auth/react";





const Page = () => {

  // получаем данные о сессии
  const session = useSession().data;

  // получаем данные о состоянии создания нового поста
  const newPostState = useNewPost();

  // функция для отправки формы (редактор) на предпросмотр
  const onSubmitToPreview = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // если форма не валидна, то ничего не делаем
    if (!newPostState.validate) return;
    // изменяем состояние на предпросмотр
    newPostState.setVariant(variant.Prewiew);
  };


  // если пользователь не админ, то отображаем сообщение об отсутствии прав
  if (!isAdmin(session)) return <>Нет прав </>;
  // если состояние создания нового поста - редактор, то отображаем форму
  if (newPostState.variant == variant.Editor) {
    // если форма валидна, то отображаем кнопку "ПРЕДПРОСМОТР"
    if (
      newPostState.category.length > 3 &&
      newPostState.title.length > 3 &&
      newPostState.content.length > 10 &&
      newPostState.autor.length > 3
    ) {
      if (!newPostState.validate)
        newPostState.setValidate(!newPostState.validate);
    } else {
      // если форма не валидна, то отображаем кнопку "ПРЕДПРОСМОТР" disabled
      if (newPostState.validate)
        newPostState.setValidate(!newPostState.validate);
    }

    return (
      // форма создания нового поста
      <form id="InputNewPost" name="newpost" onSubmit={onSubmitToPreview}>
        <div className="grid px-10 gap-5">

          <input
            minLength={3}
            value={newPostState.title}
            onChange={(e) => newPostState.setTitle(e.target.value)}
            name="tittle"
            className="p-4 border-2"
            type="text"
            placeholder=" "
          />

          <input
            minLength={3}
            value={newPostState.category}
            onChange={(e) => newPostState.setCategory(e.target.value)}
            name="cat"
            className="p-4 border-2"
            type="text"
            placeholder=" "
          />

          <Editor
            min={5}
            value={newPostState.content}
            onTextChange={(e) => newPostState.setContent(String(e.htmlValue))}
            name="content"
            className="col-span-2 h-80 mb-10"
          />


          <input
            minLength={3}
            value={newPostState.autor}
            onChange={(e) => newPostState.setAutor(e.target.value)}
            name="autor"
            className="p-4 border-2"
            type="text"
            placeholder=" "
          />

          <Button
            type="submit"
            disabled={!newPostState.validate}
            className="w-full border-2 disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-400 border-teal-500 font-semibold text-teal-500  hover:bg-teal-500 hover:text-white transition-all"
            label=" "
            icon="pi pi-check"
          />
        </div>
      </form>
    );
  }

  // если состояние создания нового поста - предпросмотр, то отображаем предпросмотр
  return (

    
    newPostState.variant === variant.Prewiew && (
      <View
        post={{
          autor: newPostState.autor,
          content: newPostState.content,
          img: null,
          title: newPostState.title,
          category: newPostState.category,

        }}
        isNewPost={true}
      />
    )
  );
};

export default Page;
