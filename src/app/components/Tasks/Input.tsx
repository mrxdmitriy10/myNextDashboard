'use client'

import { iOnsubmit } from "@/types/iEvent";
import { ChangeEvent, useState } from "react";





interface propTypes {
    submit: (e: iOnsubmit, text_task: string) => Promise<void>
}


export const Input:React.FC<propTypes>=({submit}) => {
    const [value, setValue] = useState('')


    
    const onSubmit = (e:iOnsubmit) => {
        
        if (value.length<4) {
            e.preventDefault()
            return
        }
        submit(e, value)
        setValue('')
    }

    const onChange = (e:ChangeEvent<HTMLInputElement>) => {

        setValue(e.target.value)
    }
    


    

    return ( 


            <form name='input' className="w-5/6 m-auto" onSubmit={onSubmit}>
                <label className="flex border border-solid rounded-full border-gray-600">
                    
                    <input min={4} minLength={4} maxLength={55} name='text' type='text' onChange={onChange} value={value} placeholder="+ еще одна" className="input w-full max-w-xs p-3 rounded-3xl text-sm text-gray-500 text-center border-none focus-visible" />
                    <button  className="bg-purple-700 rounded-r-full px-5 text-white font-semibold font-mono outline-none active:outline-none focus:outline-none border-none active:border-none text-xl focus:border-none" type='submit'>↪</button>
                </label>
            </form>

    );
}

export default Input