import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import UpdateComment from './../components/UpdateComment/UpdateComment';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

export default function useComments() {
 

let queryClient = useQueryClient();

const [isShow, setisShow] = useState(false);

function changeShow(){
  setisShow(true);
}


  const {register, handleSubmit} = form;
  
  async function UpdateComment(values){
    
    console.log(values);

    axios.put(`https://linked-posts.routemisr.com/comments/${commentId}`, values, {
      headers: {
        token: localStorage.getItem('userToken'),
      },
    })
    .then((res)=>{
      toast.success("Comment updated successfully");
      queryClient.invalidateQueries({queryKey: ['UserPosts']})
    })
    .catch((err)=>{
      toast.error(err.message);
    })    
}
 
    return (
    <>
    </>
)
}
