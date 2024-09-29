'use client'



interface Props {
    active: boolean
}

const Like:React.FC<Props> = ({active}) => {


    const onClick = ():void=> {

        
    }



    return active ? ( 
        <div onClick={onClick} className="hover:text-red-600 text-red-400">♥</div>
     ) : <></>
}
 
export default Like;