
import { usenewCommentStore } from "@/store/blog/newComment.store";

import { useSession } from "next-auth/react";
import { FormEvent } from "react";





type Props = {
  post_id: number;

};

export const InputNewComment: React.FC<Props> = ({
  post_id,

}) => {
  const newCommentStore = usenewCommentStore();



  const session = useSession().data;
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!session) return;
    newCommentStore.fetch(post_id, session);



 
  };

  return session?.user ? (
    <form
      className="grid grid-cols-6"
      id="newcomment"
      onSubmit={onSubmit}
      method="post"
    >
      <label className="col-span-5">
        <textarea
          rows={2}
          autoComplete="off"
          placeholder={
            session
              ? `${session.user?.name}, что думаешь на этот счет ?`
              : `Чтобы оставить комментарий необходимо автоизваться`
          }
          name="input"
          minLength={10}
          maxLength={100}
          required
          disabled={!session && true}
          spellCheck={false}
          wrap="hard"
          value={newCommentStore.text}
          onChange={(e) => newCommentStore.setText(e.target.value)}
          className="w-full h-full p-5 resize-none"
        />
      </label>
      <button
        className={
          "col span-1 border h-full w-full text-sm font-sans bg-pink-700 text-white disabled:bg-slate-400"
        }
        disabled={
          !newCommentStore.validate ||
          newCommentStore.final ||
          newCommentStore.loading ||
          !session
            ? true
            : false
        }
      >
        {newCommentStore.loading ? (
          <>загрузка</>
        ) : newCommentStore.final ? (
          <>Отправлено</>
        ) : (
          <>Написать</>
        )}
      </button>
    </form>
  ) : (
    <p>
      <a href="#auth" className="hover:underline text-blue-500">
        Авторизуйтесь
      </a>
      , чтобы писать комментарии
    </p>
  );
};

export default InputNewComment;
