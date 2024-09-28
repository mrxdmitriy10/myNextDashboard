import iFocus from "@/types/iFocus"
import React from "react"


interface PropsType {
    item: string
    focus: iFocus
}


export const DidBuy:React.FC<PropsType> = ({item, focus}) => {


    
 
    const onCLick = () => {

            setTimeout(()=>{focus.set_focus(null)
            },5000)
            focus.set_focus(focus.id)

        }
    
    return ( 

            <button onClick={onCLick}
              className="inline-block m-2 select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] rounded-full"
              type="button"> {item}
            </button>
    )
}
