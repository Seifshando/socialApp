import React, { useState } from 'react'
import style from './UpdatePost.jsx'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function UpdatePost({id}) {

let queryClient = useQueryClient();

const [isShow, setisShow] = useState(false);

function changeShow(){
  setisShow(true);
}

const form = useForm({
  defaultValues : {
    body : "",
    image : ""
  }
})

  const {register, handleSubmit} = form;
  
  async function updatePost(values){
    
    // console.log(values.body);
    // console.log(values.image[0]);
    
    let myData = new FormData();

    myData.append('body', values.body);
    myData.append('image', values.image[0]);


      axios.put(`https://linked-posts.routemisr.com/posts/${id}`, myData, {
      headers: {
        token: localStorage.getItem('userToken'),
      },
    })
    .then((res) => {
      console.log(res);
      
    if(res.data.message === "success"){
      toast.success("Post Updated Successfuly");
      queryClient.invalidateQueries({queryKey: ['UserPosts'], });
    }
    })
    .catch((err) => {
      console.log(err);
      toast.error("Can't Update This Post");
    });
  }



return (
  
  <>
  <button onClick={() => changeShow()} data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="my-5 pb-2 w-full block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
    Update Post
  </button>

    {isShow &&   <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Add Your Post
                  </h3>
                  <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                      <i className='fas fa-close' onClick={() => setisShow(false)}></i>
                      <span className="sr-only">Close modal</span>
                  </button>
              </div>
              <div className="p-4 md:p-5">
                  <form onSubmit={handleSubmit(updatePost)} className="space-y-4" action="#">
                      <div>
                          <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your text</label>
                          <input type="text" id="text" {...register("body")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Post detalis..." required />
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center">
                            <i className="fa-solid fa-image fa-2xl"></i>
                          </label>
                          <input type="file"  id="password" {...register("image")} className="hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                      </div> 
                      <button  type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Post</button>
                  </form>
              </div>
          </div>
      </div>
    </div> }
</>
  )
}