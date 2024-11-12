type iPostBlog = {
  id?: number;
  img?: string | null;
  title: string;
  category: string;
  content: string;
  autor: string;
  date?: string | Date;
  likes?: number;
  _count?: {
    BlogComments: number; // Подсчитываем количество комментариев
    likes: number
  };
};
export default iPostBlog;
