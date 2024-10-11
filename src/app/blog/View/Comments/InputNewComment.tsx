
import UseSessionReturn from "@/types/useSessionReturn"
import axios from "axios"


import { useState } from "react"

export type newpost_data = {
    post_id: Props['post_id'],
    text: string,
    username: 'string'
}
type Props = {
    session: UseSessionReturn
    post_id: number,
    fetch_comments: () => Promise<void>
}

export const InputNewComment: React.FC<Props> = ({ session, post_id, fetch_comments }) => {
    const [textinput, setTextInput] = useState<string>('')
    const [validate, setValidate] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean | 'error' | 'final'>(false) //Так нужнр делать везде



    const onSubmit = () => {
        if (!session) return
        if (textinput.length < 10) return


        const fetch_addcomment = async () => {

            try {
                setLoading(true)
                await axios.post(`/api/blog/${post_id}/comments/`, { post_id: post_id, text: textinput, username: session.data?.user?.name })
                fetch_comments()
            } catch (error) {
                setLoading('error')
                console.log(error);
            } finally {

                setLoading('final')
                setTextInput('')
            }
        }
        fetch_addcomment()
    }

    if (textinput.length > 5) {
        if (!validate) setValidate(!validate)
    } else {
        if (validate) setValidate(!validate)
    }

    return (
        session.data?.user ? <form className="grid grid-cols-6" id="newcomment" action={onSubmit} method="post">
            <label className="col-span-5">
                <textarea rows={2}
                    autoComplete='off'
                    placeholder={session ? `${session.data?.user?.name}, что думаешь на этот счет ?` : `Чтобы оставить комментарий необходимо автоизваться`}
                    name='input'
                    minLength={10}
                    maxLength={100}
                    required
                    disabled={!session && true}
                    spellCheck={false}
                    wrap="hard"
                    value={textinput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="w-full h-full p-5 resize-none" />

            </label>
            <button className={"col span-1 border h-full w-full text-sm font-sans bg-pink-700 text-white disabled:bg-slate-400"} disabled={(!validate || loading == 'final' || loading == true || !session) ? true : false}>
                {
                    loading == true ? <>загрузка</> : loading == 'final' ? <>Отправлено</> : <>Написать</>
                }
            </button>

        </form>:<p><a href="#auth" className="hover:underline text-blue-500">Авторизуйтесь</a>, чтобы писать комментарии</p>

    );
}


export default InputNewComment