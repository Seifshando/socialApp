import React, { useState } from 'react'
import useComments from '../../Hooks/useComments'
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';



export default function DeleteComment({is, updDel}){
let queryClient = useQueryClient();

  
   function deleteComment(){
    

    axios.delete(`https://linked-posts.routemisr.com/comments/${updDel}`, {
      headers: {
        token: localStorage.getItem('userToken'),
      },
    })
    .then((res)=>{
    console.log(res);
      toast.success("Comment deleted successfully");
      queryClient.invalidateQueries({queryKey: ['UserPosts']})
    })
    .catch((err)=>{
      toast.error(err.message);
    })    
}
    
    
    
    return (
  <>
{is && <button onClick={()=> deleteComment()} className=" my-5 pb-2 w-full block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
    Delete Comment
  </button>}
</>
  )
}
