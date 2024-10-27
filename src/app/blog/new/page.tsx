"use client";

import { Editor } from "primereact/editor";
import { Button } from "primereact/button";

import { FormEvent } from "react";
import View from "../../components/Blog/View/View";


import { isAdmin } from "@/lib/isAdmin";
import { variant, useNewPost } from "../../../store/blog/newPost.store";
import { useSession } from "next-auth/react";




const Page = () => {

  const session = useSession().data
  const newPostState = useNewPost();

  const onSubmitToPreview = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newPostState.validate) return;
    newPostState.setVariant(variant.Prewiew);
  };


  if (!isAdmin(session)) return <>Нет прав</>;
  if (newPostState.variant == variant.Editor) {
    if (
      newPostState.category.length > 3 &&
      newPostState.title.length > 3 &&
      newPostState.content.length > 10 &&
      newPostState.autor.length > 3
    ) {
      if (!newPostState.validate)
        newPostState.setValidate(!newPostState.validate);
    } else {
      if (newPostState.validate)
        newPostState.setValidate(!newPostState.validate);
    }

    return (
      <form id="InputNewPost" name="newpost" onSubmit={onSubmitToPreview}>
        <div className="grid px-10 gap-5">
          <input
            minLength={3}
            value={newPostState.title}
            onChange={(e) => newPostState.setTitle(e.target.value)}
            name="tittle"
            className="p-4 border-2"
            type="text"
            placeholder="Заголовок"
          />
          <input
            minLength={3}
            value={newPostState.category}
            onChange={(e) => newPostState.setCategory(e.target.value)}
            name="cat"
            className="p-4 border-2"
            type="text"
            placeholder="Категория"
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
            placeholder="Автор"
          />
          <Button
            type="submit"
            disabled={!newPostState.validate}
            className="w-full border-2 disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-400 border-teal-500 font-semibold text-teal-500  hover:bg-teal-500 hover:text-white transition-all"
            label="ПРЕДПРОСМОТР"
            icon="pi pi-check"
          />
        </div>
      </form>
    );
  }

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
