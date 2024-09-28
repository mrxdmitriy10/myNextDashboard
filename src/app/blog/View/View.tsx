'use client'

import htmlParser from "@/lib/htmlparser";
import styles from '@/app/blog/View/styles.module.scss'

import Like from "./RightCol/Like";
import RightCol from "./RightCol/RightCol";
import axios from "axios";

import iPostBlog from "@/types/iPostBlog";
import { Dispatch, SetStateAction } from "react";
import { redirect } from "next/navigation";
import router from "next/router";
import { stateUploadType } from "./RightCol/ButtonNewPost";




const css = `
  .p-hidden-accessible {
    border: 0;
    padding: 0;
    margin: -1px;
    position: absolute;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    clip-path: inset(50%);
    white-space: nowrap;
}

.p-hidden-accessible input,
.p-hidden-accessible select {
    transform: scale(0);
}

.p-overflow-hidden {
    overflow: hidden;
    padding-right: var(--scrollbar-width);
`

type Props = {
    post: iPostBlog
    isNewPost: boolean,
    setStateEditPreview?: Dispatch<SetStateAction<'edit' | 'preview'>>

}
const View:React.FC<Props> = ({post, isNewPost, setStateEditPreview}) => {

    const clickPublish = async (func:stateUploadType) => {
        try {
          func('load')
          const res = await axios.post('/api/blog/', post)
          console.log('res ', res.data);
        } catch (error) 
        {
          func('error')
          console.error('err ', error);
        }
        finally {
          func('finish')
        }
    }


    const clickBackWrite = async () => {
      setStateEditPreview?setStateEditPreview('edit'):{}
  }

    return ( 
      <main className='text-slate-700 grid gap-2 grid-cols-10 p-10'>
        <div className='col-span-8 grid gap-5'>
        <div className='font-light text-2xl p-8 bg-purple-200 text-purple-500'>

            {post.tittle}
          </div>
          <div className='w-full font-light text-justify p-8'>

            {htmlParser.parse(post.content)}
    
            </div>

            


          

        </div>
        <div className="col-span-2 ">
        <RightCol postInfo={{date: post.date, autor: post.autor}} newpost={{isNewPost: isNewPost, clickPublish: clickPublish, clickBackWrite: clickBackWrite}} />
        </div>

        </main>
    );
}

export default View