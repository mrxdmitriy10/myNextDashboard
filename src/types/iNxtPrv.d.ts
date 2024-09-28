import { MouseEvent } from "react";


export default interface iNxtPrv {
    visiblenxt: boolean;
    visibleprv: boolean;
    nextHandleEvent: (e:MouseEvent<HTMLButtonElement>) => void,
    prevHandleEvent: (e:MouseEvent<HTMLButtonElement>) => void,
}