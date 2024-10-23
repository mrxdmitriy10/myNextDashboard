
type iPostBlog = {
    id?: number
    img?: string | null
    title: string,
    category: string,
    content: string,
    autor: string,
    date?: string | Date
    likes?: number
}
export default iPostBlog