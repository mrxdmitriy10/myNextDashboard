'use client'

import React, { Dispatch, MouseEvent, SetStateAction, useState } from "react";


import Link from "next/link";

import iPostBlog from "@/types/iPostBlog";
import ClampLines from 'react-clamp-lines';
import htmlParser from "@/lib/htmlparser";
import Image from "next/image";


interface Props extends iPostBlog {
    del: {
        state: boolean,
        set: Dispatch<SetStateAction<boolean>>,
        action: (id:number) => void
    }
}





export const Card:React.FC<Props> = (props):JSX.Element => {
    const [active, setActive]= useState<boolean>(false)

    const onMouseEnter = () => {
         

                setActive(true)

         
         
     }

     const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
            if (!props.id) return
            if (props.del.state) {
             e.preventDefault()
             props.del.action(props.id)
             props.del.set(false)
         }

        
        
     }
     const onMouseLeave = () => {

            setActive(false)


    }
    // const PostImg:React.FC = () => {
    //     if (props.img == null) return
    //     return (
    //         <div>
    //             <Image  src={props.img} alt='img' width={200} height={200} />
    //         </div>

    //     )
    // }
    return ( 

            <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}  className={" bg-white border m-3 p-4 2xl:px-14 2xl:pr-48 pr-32 lg:pr-10 text-xm hover:drop-shadow-lg bg-clip-border rounded-xl drop-shadow-2xl text-gray-700 transition-all" + (active&&props.del.state ? ' text-red-500' : ' ')}>
                <Link onClick={onClick} href={'/blog/'+ props.id } >


                        {/* <PostImg /> */}

                        <div className="flex flex-col justify-between w-auto lg:max-w-80 min-h-40 lg:min-h-52 pl-2 overflow-hidden">
                        <div className="flex justify-between justify-items-center">

                        <p className="w-full antialiased text-xs font-mono
                            font-light text-inherit mb-2 
                            ">
                                [{props.category}]
                                [{props.id}]
                        </p>

                        </div>

                        <span 
                            className="block antialiased tracking-normal 
                                        font-sans text-xm font-semibold 
                                        leading-snug text-blue-gray-500 mb-2 
                                        normal-case transition-colors 
                                        ">
                                            {props.tittle}
                        </span>        


                            <ClampLines className="
                            antialiased
                            whitespace-normal
                            inline-block
                            w-full
                            font-sans text-sm 
                            !text-gray-600" lines={3} ellipsis="..." buttons={false} id={'content'} text={htmlParser.parse(props.content.replace(/(<([^>]+)>)/gi, ''))} />

                           
                            <p className={' text-blue-600 text-sm antialiased transition-all ' + (active ? 'opacity-100' : ' opacity-0')}>Читать продолжение</p>

                            


                        </div>
                        



                    
                    </Link>

                    </div>
    );
}