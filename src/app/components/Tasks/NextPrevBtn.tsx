

import Btn from "./Btn";
import iNxtPrv from '../../../types/iNxtPrv';



interface PropsType extends iNxtPrv {

    visible: boolean;

}
const NextPrevbtn:React.FC<PropsType>  = ({nextHandleEvent, prevHandleEvent, visible, visiblenxt, visibleprv}) => {

    
        let cN:string = ' opacity-100'  
        if (!visible) {
            cN=' opacity-0'
        }
        return ( 

                <div className={"h-2 p-5"+ cN}>
                    <Btn visiblenxt={visiblenxt} visibleprv={visibleprv} nextHandleEvent={nextHandleEvent} prevHandleEvent={prevHandleEvent}/>
                </div>

        );
    }
export default NextPrevbtn