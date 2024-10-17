import { redirect } from "next/navigation"




const Page: React.FC = ({}) => {
 

  redirect('/blog')

  return (
   <div>
    <h1 className="text-slate-700 text-4xl">
      Я обязательно стану сеньором
      <p>Первые изменения в MVP для изучения github</p>
      <p>Первые изменения в MVP для изучения GitHub</p>
      <p>Еще один параграф</p>
      <p>Изучаю next js</p>
      <p>Her next js</p></h1>

      


  </div>
  )
}

export default Page