'use client'

import { Editor, EditorTextChangeEvent } from 'primereact/editor';
import { Button } from 'primereact/button';


import htmlParser from '@/lib/htmlparser'
import { FormEvent, useState } from 'react';
import View from '../View/View';
import iPostBlog from '@/types/iPostBlog';




const Page = () => {
  const [tittle, setTittle] = useState<iPostBlog['tittle']>('')
  const [cat, setCat] = useState<iPostBlog['category']>('')
  const [htmlcontent, setHtmlContent] = useState<iPostBlog['content']>('')
  const [autor, setAutor] = useState<iPostBlog['autor']>('')
  const [state, setState] = useState<'edit' | 'preview'>('edit')
  const [validate, setValidate] = useState<boolean>(false)



  const onSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validate) return
    setState('preview')
}


if (state=='edit') {

  if (cat.length>3 && tittle.length>3 && htmlcontent.length >10 && autor.length > 3) 
    {
      !validate?setValidate(true):{}
    }
    else {
      validate?setValidate(false):{}
    }


  return (
    
    <form id='aaa' name='newpost' onSubmit={onSubmit}>
      <div className='grid px-10 gap-5'>
        <input minLength={3} value={tittle} onChange={e=>setTittle(e.target.value)} name='tittle' className='p-4 border-2' type="text" placeholder="Заголовок" />
        <input minLength={3} value={cat} onChange={e=>setCat(e.target.value)} name='cat' className='p-4 border-2' type="text" placeholder="Категория" />
        <Editor min={5} value={htmlcontent} onTextChange={e=>setHtmlContent(String(e.htmlValue))} name='content' className='col-span-2 h-80 mb-10'  />

        <input minLength={3} value={autor} onChange={e=>setAutor(e.target.value)} name='autor' className='p-4 border-2' type="text" placeholder="Автор" />
        <Button type='submit' disabled={!validate} className='w-full border-2 disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-400 border-teal-500 font-semibold text-teal-500  hover:bg-teal-500 hover:text-white transition-all' label="ПРЕДПРОСМОТР" icon="pi pi-check" />
      </div>
    </form>

  )

  }


if (state == 'preview') {
  return (
  <View post={{autor: autor, content: htmlcontent, img: null, tittle: tittle, category: cat}} isNewPost={true} setStateEditPreview={setState}/>
  )
}

}

export default Page

