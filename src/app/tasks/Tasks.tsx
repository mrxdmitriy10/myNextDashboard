
'use client'

import {  useEffect, useState } from "react";

import iTask from "@/types/iTasks";
import NextPrevbtn from "./NextPrevBtn";
import axios from "axios";
import Input from "./Input";
import { iOnsubmit } from "@/types/iEvent";
import Image from "next/image";








type propTypes = {
    tittle: string,
    maxrow: number,

}





export const Tasks: React.FC<propTypes> = ({ tittle, maxrow }) => {

    const [visiblenxt, setVisiblenxt] = useState<boolean>(true)
    const [visibleprv, setVisibleprv] = useState<boolean>(true)

    const [i, setI] = useState<number>(1)
    const [visiblebtn] = useState<boolean>(false)
    const [border] = useState<string>(" shadow-xl")
    const [data, setData] = useState<iTask[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const [selectTaskId, setSelectTaskId] = useState<number | undefined>()
    const [mousepos, setMousePos] = useState<{x: number, y: number}>({x:0,y:0})


    const delTaskId = async () => {
        try {
            await axios.delete(`api/tasks/${selectTaskId}`)
        }  catch (error) {
            console.log(`Ошибка удаления задачи ${selectTaskId} `, error);
        } finally {
            getData()
        }
    }



    const getData = async () => {
        try {
            const res = await axios.get(`/api/tasks/${tittle}`)
            setData(res.data)
        }
        catch (error) {
            console.log('Ошибка при загрузке данных ', error);
        }
        finally {
            setLoading(false)
        }

    }
    useEffect(() => {
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const nextHandleEvent = () => {
        if ((i) < pages) {
            setI(i + 1)
        }
    }

    const prevHandleEvent = () => {
        if (i > 1) {
            setI(i - 1)
        }
    }
    const addTasktocat = async (e: iOnsubmit, text_task: string) => {
        e.preventDefault()
        const res = await axios.put(`/api/tasks/${tittle}`, { text_task })
        setData(res.data)
    }
    const pages: number = Math.ceil(data.length / maxrow)

    if (i == pages) {
        if (visiblenxt == true) {
            setVisiblenxt(false)
        }
    } else {
        if (visiblenxt == false) {
            setVisiblenxt(true)
        }
    }
    if (i == 1) {
        if (visibleprv == true) {
            setVisibleprv(false)
        }
    } else {
        if (visibleprv == false) {
            setVisibleprv(true)
        }
    }

    const onMouseDown = (e:React.MouseEvent<HTMLDivElement>) => {
        setSelectTaskId(Number(e.currentTarget.id))
        setMousePos({x: e.currentTarget.offsetLeft+e.currentTarget.offsetWidth/2, y: e.currentTarget.offsetTop-10})
    }

    const onMouseUp = () => {
        setSelectTaskId(undefined)

    }
    


    return (
        <div onMouseUp={onMouseUp} className={'sm:min-h-96 w-full select-none bg-white rounded-lg shadow-xl p-3 flex flex-col gap-10 xl:max-w-96' + border}>


            <div className="text-xl font-mono text-purple-950">{tittle}</div>
            <div className="flex flex-row flex-wrap justify-center gap-1">
                {loading ? <>Загружаем задачи</> : !data.length?<>тут задач нет</>:data.slice(((i - 1) * maxrow)).map((i, index) => {
                    if (index < maxrow) {
                        return (
                            <div key={i.id} id={String(i.id)} onMouseDown={onMouseDown}  className="group relative w-auto  overflow-hidden rounded border border-gray-100 p-2  font-sans  text-slate-800 hover:text-violet-600 focus:outline-none focus:ring active:bg-indigo-600 active:text-white">
                                <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-violet-600 transition-all duration-200 group-hover:w-full"></span>
                                <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-violet-600 transition-all duration-200 group-hover:h-full"></span>
                                <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-violet-600 transition-all duration-200 group-hover:w-full"></span>
                                <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-violet-600 transition-all duration-200 group-hover:h-full"></span>

                                {i.text}
                            </div>

                        )
                    }
                })
                }
            </div>


            <div className="mt-auto flex flex-col gap-6">
                <NextPrevbtn visible={data.length ? visiblebtn : false} visiblenxt={visiblenxt} visibleprv={visibleprv} prevHandleEvent={prevHandleEvent} nextHandleEvent={nextHandleEvent} />
                
                <Input submit={addTasktocat} />

                {selectTaskId&&<Image alt='' src={'delete.svg'} onMouseUp={delTaskId} width={2.5} height={2.5} className="w-10 h-10 absolute" style={{top: mousepos.y-20, left: mousepos.x+30}} />}
            </div>

        </div>

    );
}