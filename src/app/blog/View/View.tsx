'use client'

import htmlParser from "@/lib/htmlparser";



import RightCol from "./RightCol/RightCol";
import axios from "axios";

import iPostBlog from "@/types/iPostBlog";
import { Dispatch, SetStateAction } from "react";


import { stateUploadType } from "./RightCol/ButtonNewPost";
import { CommentsBlock } from "./Comments/CommentsBlock";






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
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      setStateEditPreview?setStateEditPreview('edit'):true
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
        <div className="col-span-8 border p-8 grid gap-7">{!isNewPost?<CommentsBlock post_id={post.id} />:<></>}</div>

        </main>
    );
}

export default View