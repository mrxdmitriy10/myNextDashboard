'use client'

import React, { Dispatch, MouseEvent, SetStateAction, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import iPostBlog from "@/types/iPostBlog";

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
    const PostImg:React.FC = () => {
        if (props.img == null) return
        return (
            <div>
                <Image  src={props.img} alt='img' width={200} height={200} />
            </div>

        )
    }
    return ( 

            <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}  className={"bg-white w-auto border m-3 p-3 text-xm hover:drop-shadow-lg bg-clip-border rounded-xl drop-shadow-2xl text-gray-700 transition-all" + (active&&props.del.state ? ' text-red-500' : ' ')}>
                <Link   onClick={onClick} href={'/blog/'+ props.id } >


                        <PostImg />

                        <div className="w-auto sm:max-w-72 pl-2">

                        <p className="antialiased text-xs font-mono
                            font-light text-inherit mb-2 
                            ">
                                [{props.category}]
                                [{props.id}]
                        </p>
                        <span 
                            className="block antialiased tracking-normal 
                                        font-sans text-xm font-semibold 
                                        leading-snug text-blue-gray-500 mb-2 
                                        normal-case transition-colors 
                                        ">
                                            {props.tittle}
                        </span>        
                        <p className="h-20
                                        antialiased
                                        whitespace-normal
                                        inline-block
                                        overflow-hidden
                                        w-full
                                        text-ellipsis
                                        mb-8 font-sans text-sm 
                                        !text-gray-600">
                            {props.content.replace(/(<([^>]+)>)/gi, '')}
                        </p>
                         <p className={'text-blue-600 text-sm antialiased transition-all ' + (active ? 'opacity-100' : ' opacity-0')}>Читать продолжение</p>
                       

                        </div>


                    
                    </Link>

                    </div>
    );
}