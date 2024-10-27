import iNxtPrv from '../../../types/iNxtPrv';




export const Btn:React.FC<iNxtPrv> = ({visiblenxt, visibleprv, nextHandleEvent, prevHandleEvent}) => {



    const funcprv = (visibleprv:iNxtPrv['visibleprv']) => {
        if (visibleprv) {
        return (<button onClick={prevHandleEvent} 
                    className="select-none align-bottom inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-stone-800 text-white shadow hover:bg-primary/90 h-9 px-4 py-2 m-0.5">Prev</button>
        )}}


    const funcnxt = (visiblenxt:iNxtPrv['visiblenxt']) => {
        if (visiblenxt) {
        return (
        <button onClick={nextHandleEvent} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-stone-800 text-white shadow hover:bg-primary/90 h-9 px-4 py-2 m-0.5">Next</button>
        )   }}


    return ( 
        <div>
               
                {funcprv(visibleprv)}
                {funcnxt(visiblenxt)}

               
        

            
            
        </div>
    );
}

export default Btn