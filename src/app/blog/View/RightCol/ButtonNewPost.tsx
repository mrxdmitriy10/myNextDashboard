'use client'


import { Props } from '@/app/blog/View/RightCol/RightCol'
import TloadingState from '@/types/Tloading'

import { Dispatch, SetStateAction, useState } from 'react'



export type stateUploadType = Dispatch<SetStateAction<TloadingState>>
type PropsType = {
    newpost: Props['newpost']
}
const ButtonNewPost:React.FC<PropsType> =  ({newpost}) => {
    const [loadingState, setLoadingState] = useState<TloadingState>()

    const isDisable = () => {
        return (loadingState == 'load' || loadingState == 'finish' )?true:false
    }

    return !newpost.isNewPost ? <></>:( 
        <>
        <button onClick={()=>newpost.clickPublish(setLoadingState)} disabled={isDisable()} type="button" className="w-full text-white transition-all bg-teal-500 hover:bg-teal-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">


            {

                loadingState=='load'?<>Загрузка</>:
                loadingState=='error'?<>Ошибка</>:
                loadingState=='finish'?<>Опубликовано</>:<>Опубликовать</>


            }
        
        
        </button>
        <button onClick={newpost.clickBackWrite} disabled={isDisable()} type="button" className="w-full text-white transition-all bg-teal-500 hover:bg-teal-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            Изменить
        </button>
        </>
    )  
}

export default ButtonNewPost