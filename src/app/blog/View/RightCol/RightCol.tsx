'use client'


import Like from "./Like"

import ButtonNewPost, { stateUploadType } from "./ButtonNewPost"
import { Dispatch, SetStateAction } from "react"

export type Props = {
    postInfo: {
        date?: string,
        autor: string,
    },
    newpost: {
        isNewPost: boolean,
        clickPublish: (func: stateUploadType) => void
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