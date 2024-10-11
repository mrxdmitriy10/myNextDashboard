'use client'

import htmlParser from "@/lib/htmlparser";



import RightCol from "./RightCol/RightCol";
import axios from "axios";

import iPostBlog from "@/types/iPostBlog";
import { Dispatch, SetStateAction } from "react";


import { stateUploadType } from "./RightCol/ButtonNewPost";
import { CommentsBlock } from "./Comments/CommentsBlock";

import { useSession } from "next-auth/react";







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
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      setStateEditPreview?setStateEditPreview('edit'):true
  }
  const session = useSession()


    return ( 
      <main className='text-slate-700 grid grid-cols-10 gap-8 sm:gap-4 sm:p-10'>
        <div className='col-span-10 sm:col-span-8 grid gap-5'>
        <div className='font-light text-2xl p-2 sm:p-8 bg-purple-200 text-purple-500'>

            {post.tittle}
          </div>
          <div className='w-full font-light text-justify sm:p-8 p-2'>

            {htmlParser.parse(post.content)}
    
            </div>
        </div>
        <div className="col-span-10 sm:col-span-2">
        <RightCol postInfo={{date: (post.date)?post.date:undefined, autor: post.autor}} newpost={{isNewPost: isNewPost, clickPublish: clickPublish, clickBackWrite: clickBackWrite}} />
        </div>
        {!isNewPost?<div className="col-span-10 border p-2 sm:p-8 grid gap-7"><CommentsBlock session={session} post_id={post.id as number}  /></div>:<></>}

        </main>
    );
}

export default View