export default interface iDelBlog{
    state: boolean
    setState: Dispatch<SetStateAction<boolean>>
    delete: (id:number) => void,

}