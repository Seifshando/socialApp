import React from 'react'
import style from './Postdetails.jsx'
import Comment from './../Comment/Comment';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';



export default function Postdetails() {

 let {id}= useParams()

  function getSinglePost(){
    return axios.get(`https://linked-posts.routemisr.com/posts/${id}`,{ 
      headers : {
        token : localStorage.getItem('userToken'),
      },
    });
  }

  let {data, isLoading, error, isError} = useQuery({
    queryKey : ['getSinglePosts'],
    queryFn  : getSinglePost,
    select : (data) => data?.data?.post
  })

  // console.log(data);
  

    if(isError){
    return <h1 className='ms-5'>{error.message}</h1>
  }
  
  if(isLoading){
    return <div className="spinner"></div>
  }

   
  return (
    <>
      <div  className='bg-slate-300 w-full md:w-[80%] lg:w-[60%] rounded-md mx-auto my-12'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center  ps-3 py-4'>
                <img src={data?.user.photo} className='size-[36px]' alt="" />
                <p className='ms-2'>{data?.user.name}</p>
            </div>
            <div>
              <p className='pe-2 text-sm text-slate-400'>{data?.createdAt}</p>
            </div>
          </div>

          {data?.body && 
          <h2 
            className='mb-4 p-4'>
            {data?.body}
          </h2>}

          {data?.image && (
            <img 
            src={data?.image} 
            className='w-full rounded-md' 
            alt={data?.body} 
            />)}

            {data?.comments.map((comment) => <Comment key={comment._id} comment={comment}/>)}
      </div>
    </>
  )
}
