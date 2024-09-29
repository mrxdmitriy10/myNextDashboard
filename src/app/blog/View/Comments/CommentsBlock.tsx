
import axios from "axios";
import { useEffect, useState } from "react";

type comment = {
    id: number,
    autor: string,
    comment: string,
    date: string
}

type Props = {
    post_id: number
}


export const CommentsBlock = ({post_id}: Props) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<comment[]>([])

    useEffect(()=>{
        const fetch = async () => {
            try {
                const res: {data: comment[]} = await axios.get(`/api/blog/${post_id}/comments`)
                setData(res.data)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }

        if(loading)fetch()
    })



        return loading? <>Загрузка комментариев</>: !data.length?<>Комментариев нет, будь первым</>:data.map((i:comment)=>{

            return (
                <div key={i.id} className="w-full h-24 grid gap-1">
                    <span className="font-sans  text-white w-full bg-purple-500 flex justify-between">
                        <span className="my-auto px-5 font-semibold">{i.autor}</span>
                        <span className="my-auto px-10 font-light">{i.date.split('T')[0]} {i.date.split('T')[1].split('.')[0]}</span>
                    </span> 
                    <p className="p-5">{i.comment}</p>


                </div>

            )
        })


}
