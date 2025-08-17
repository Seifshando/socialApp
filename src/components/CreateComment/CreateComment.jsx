import React, { useState } from 'react'
import style from './CreateComment.jsx'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';


export default function CreateComment({postId}) {


  
let query = useQueryClient()

const [isShow, setisShow] = useState(false);

function changeShow(){
  setisShow(true);
}

const form = useForm({
  defaultValues : {
    content : "",
    post : postId
  }
})

  const {register, handleSubmit} = form;
  
  async function addComment(values){
    
    console.log(values);
    
    try {
      let res = await axios.post(`https://linked-posts.routemisr.com/comments`, values, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      });
      console.log(res);
      toast.success("comment added successfuly")
      query.invalidateQueries({
        queryKey: ['UserPosts'],
      });
      
    } catch (error) {
      console.log(error);
      toast.error("can't add this comment..!")
    }  
  }





  return (

<>
  <button onClick={() => changeShow()} data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="my-5 pb-2 w-full block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
    Add Comment
  </button>

    {isShow &&   <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Add Your Comment
                  </h3>
                  <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                      <i className='fas fa-close' onClick={() => setisShow(false)}></i>
                      <span className="sr-only">Close modal</span>
                  </button>
              </div>
              <div className="p-4 md:p-5">
                  <form onSubmit={handleSubmit(addComment)} className="space-y-4" action="#">
                      <div>
                          <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your text</label>
                          <input type="text"   {...register('content')} id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="comment..." required />
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                          <input type="hidden" {...register('post')} value={postId} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                      </div> 
                      <button  type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Comment</button>
                  </form>
              </div>
          </div>
      </div>
    </div> }
</>
  )
}

