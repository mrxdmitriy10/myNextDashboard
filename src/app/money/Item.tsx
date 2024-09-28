
import { useState } from "react";

import Image from "next/image";
import iItemMoney from "@/types/iItemMoney";
import iMoneyhndl from "@/types/iMoneyhndl";


interface propsType extends iItemMoney, iMoneyhndl {}

const ItemMoney:React.FC<propsType> = ({img, name, amount, index, actions}) => {


    const [visible, setvVisible] = useState("opacity-0")
    const onMouseEnter = () => {
        setvVisible("opacity-100")
    }
    const onMouseLeave = () => {
        setvVisible("opacity-0")
    }


    return ( 
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div className="grid grid-cols-6 text-right w-full bg-white border-b drak:bg-gray-800 drak:border-gray-700 hover:bg-gray-50 drak:hover:bg-gray-600">
            
                <div className="relative col-span-2 p-5 mx-5 w-4/5 h-full">
                    <Image src={img} fill={true} priority={true} className="" alt="Apple Watch" />
                </div>

                <div className="px-2 col-span-2 py-10 font-semibold text-gray-900 drak:text-white">
                    {name}
                </div>



                <div className="px-6 py-10 font-semibold text-gray-900 drak:text-white">
                    {amount}
                </div>
                <div className={visible}>
                    <div className="grid grid-cols-2 gap-3 p-4 pt-8">
                        <div className="text-right">
                            <div id={String(index)} onClick={actions.buy} className="font-medium text-green-600 hover:underline drak:text-red-500">OK</div>
                        </div>

                        <div className="text-right">
                            <div id={String(index)} onClick={actions.del} className="font-medium text-red-600 hover:underline drak:text-red-500">X</div>
                        </div>
                    </div>
                </div>
            </div>

            
            
            
    </div>
     );
}
 
export default ItemMoney;