import React from 'react'
import style from './UserProfile.jsx'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Comment from '../Comment/Comment.jsx';
import { Link } from 'react-router-dom';
import CreateComment from '../CreateComment/CreateComment.jsx';
import CreatePost from '../CreatePost/CreatePost.jsx';
import UpdatePost from './../UpdatePost/UpdatePost';
import DeletePost from '../DeletePost/DeletePost.jsx';
import toast from 'react-hot-toast';
import UpdateComment from '../UpdateComment/UpdateComment.jsx';
import DeleteComment from '../DeleteComment/DeleteComment.jsx';

export default function UserProfile({id}) {


  const queryClient = useQueryClient();

  function getUserPosts(){
    return axios.get(`https://linked-posts.routemisr.com/users/${id}/posts`, {
      headers : {
        token : localStorage.getItem('userToken'),
      },
    });
  }




  let {data, error, isError, isLoading} = useQuery( {
    queryKey : ['UserPosts'],
    queryFn : getUserPosts,
    select : (data) => data?.data?.posts
  });

  console.log(data);


  function deletePost(postId){
    axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`, {
      headers: {
        token: localStorage.getItem(['userToken'])
      }
    }   )
    .then((res) => {
      // console.log(res);
      toast.success('Post Deleted Successfully');
      queryClient.invalidateQueries({queryKey : ["UserPosts"]})
    })
    .catch((err) => {
      toast.error(err.response.data.error);
    })
  }



  return (
    <>
      {data?.map((post) => (
        <div  key={post.id} className='bg-slate-300 w-full md:w-[80%] lg:w-[60%] rounded-md mx-auto my-12'>
            <Link to={`/Postdetails/${post.id}`} >        
            <div className='flex items-center justify-between'>
              <div className='flex items-center  ps-3 py-4'>
                  <img src={post?.user.photo} className='size-[36px]' alt="" />
                  <p className='ms-2'>{post?.user.name}</p>
              </div>
              <div>
                <p className='pe-2 text-sm text-slate-400'>{post?.createdAt}</p>
              </div>
            </div>

            {post?.body && 
            <h2 
              className='mb-4 p-4'>
              {post?.body}
            </h2>}

            {post?.image && (
              <img 
              src={post?.image} 
              className='w-full rounded-md' 
              alt={post?.body} 
              />)}


              
        </Link>
              {post?.comments.length > 0 && <Comment comment={post?.comments[0]}/>}
              
              
              
              
              {data && <CreateComment postId={post.id}/> }

              {/* {data && <UpdateComment commentId={post.id}/>} */}

              <UpdatePost id={post.id}/>
              <UpdateComment  updDel={post?.comments[0]?._id} commentId={post?.id} is={post?.comments[0]}/>
              <DeleteComment  updDel={post?.comments[0]?._id} commentId={post?.id} is={post?.comments[0]}/>
              <button onClick={() => deletePost(post.id)} className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 cursor-pointer">
                Delete Post
              </button>
          </div>
      ))}
    </>
  )
}
