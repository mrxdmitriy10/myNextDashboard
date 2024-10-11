

import date_time from "@/lib/formatDate";
import axios from "axios";
import { useEffect, useState } from "react";
import InputNewComment from "./InputNewComment";
import UseSessionReturn from "@/types/useSessionReturn";


type comment = {
    id: number,
    autor: string,
    comment: string,
    date: string
}

type Props = {

    post_id: number
    session: UseSessionReturn
}



export const CommentsBlock = ({session ,post_id}: Props) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<comment[]>([])



    const fetch_comments = async () => {
        try {
            const res: {data: comment[]} = await axios.get(`/api/blog/${post_id}/comments`)
            setData(res.data)
        } catch (error) {
            console.log('Ошибка при загрузке коммента');
            
        } finally {
            setLoading(false)
        }
    }


    useEffect(()=>{
        fetch_comments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
        

    


        return (
        <>
        <InputNewComment session = {session} post_id={post_id} fetch_comments={fetch_comments} />
        {

            loading? <>Загрузка комментариев</>: !data.length?<p>Комментариев нет, будь первым</p>:data.map((i:comment)=>{

                return (
                    <div key={i.id} className="w-full grid gap-1">
                        <span className="font-sans  text-white w-full bg-purple-500 flex flex-nowrap justify-between">
                            <span className="my-auto px-2 sm:px-5 font-semibold">{i.autor}</span>
                            <span className="my-auto px-2 sm:px-10 font-light">{date_time(i.date).date}</span>
                        </span> 
                        <p className="m-5 flow-root ">{i.comment}</p>


                    </div>
                )
                })
            }

        
        </>
        )
    
    }