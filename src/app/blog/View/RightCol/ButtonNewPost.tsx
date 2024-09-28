'use client'


import { Props } from '@/app/blog/View/RightCol/RightCol'
import axios from 'axios'
import router from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'
export type stateUploadType = Dispatch<SetStateAction<null | 'load' | 'error' | 'finish'>> 
type PropsType = {
    newpost: Props['newpost']
}
const ButtonNewPost:React.FC<PropsType> =  ({newpost}) => {
    const [uploadingPost, setUploadingPost] = useState<null | 'load' | 'error' | 'finish'>(null)


    return !newpost.isNewPost ? <></>:( 
        <>
        <button onClick={()=>newpost.clickPublish(setUploadingPost)} type="button" className="w-full text-white transition-all bg-teal-500 hover:bg-teal-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">


            {

                uploadingPost=='load'?<>Загрузка</>:
                uploadingPost=='error'?<>Ошибка</>:
                uploadingPost=='finish'?<>Опубликовано</>:<>Опубликовать</>


            }
        
        
        </button>
        <button onClick={newpost.clickBackWrite} type="button" className="w-full text-white transition-all bg-teal-500 hover:bg-teal-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Изменить</button>
        </>
    )  
}

export default ButtonNewPost