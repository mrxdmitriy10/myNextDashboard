'use client'


import Like from "./Like"

import ButtonNewPost  from "./ButtonNewPost"

import { Dispatch, SetStateAction } from "react"
import TloadingState from "@/types/Tloading"

export type Props = {
    postInfo: {
        date?: string,
        autor: string,
    },
    newpost: {
        isNewPost: boolean,
        clickPublish: (func: Dispatch<SetStateAction<TloadingState>>) => void
        clickBackWrite: () => void

    }
}


const RightCol:React.FC<Props> = ({postInfo, newpost}) => {
    return ( 
        <div className='gap-5 text-right flex-1'>
            <ButtonNewPost newpost={newpost} />
            <div>{postInfo.autor}</div>
            <div>{postInfo.date}</div>
            <Like active={!newpost.isNewPost}/>

        </div>
    );
}

export default RightCol