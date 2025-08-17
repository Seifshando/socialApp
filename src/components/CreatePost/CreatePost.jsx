import React from 'react'
import style from './CreatePost.jsx'
import { Link } from 'react-router-dom'
import Comment from '../Comment/Comment.jsx'
import CreateComment from '../CreateComment/CreateComment.jsx'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
// import Comment from './../Comment/Comment';

export default function CreatePost() {
  
  let form = useForm({
    defaultValues: {
      body: '',
      image: '',
    },
  });

  async function addPost(values){
    // console.log(values.body);
    // console.log(values.image[0]);
  try {
    let myData = new FormData();

    myData.append('body', values.body);
    myData.append('image', values.image[0]);

    let response = await axios.post(`https://linked-posts.routemisr.com/posts`, myData, {
      headers: {
        token: localStorage.getItem('userToken'),
      },
    });   
    console.log(response);
    if(response.data.message === 'success'){
      toast.success('Post Added Successfuly');
    }
  } catch (error) {
    // toast.error(error)
  }

  }

  


  let {register, handleSubmit} = form

  return (
  <>
      <div className=' my-10 border-2 rounded-lg p-4 text-center bg-slate-500 border-slate-900 w-full md:w-[80%] lg:w-[60%] mx-auto'>
        <form onSubmit={handleSubmit(addPost)}>
          <div>
            <input type="text" {...register("body")} className='text-white my-5 pb-2 w-full block font-medium rounded-lg text-sm px-5 py-2.5  bg-black ' placeholder='Post details...'/>
          </div>
          <div>
            <label htmlFor='photo' className='w-full block'><i className="fa-solid fa-image fa-2xl"></i> </label>
            <input type="file" {...register('image')} id='photo' className='hidden'/>
          </div>
          <div>
            <button className='my-5 pb-2 w-full block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Add post</button>
          </div>
        </form>
      </div>

    </> 
  )
}
