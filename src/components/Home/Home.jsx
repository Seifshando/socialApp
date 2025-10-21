import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Comment from './../Comment/Comment';
import CreateComment from '../CreateComment/CreateComment.jsx'
import CreatePost from '../CreatePost/CreatePost.jsx'



export default function Home() {

function getAllPosts() {
  return axios.get(`https://linked-posts.routemisr.com/posts?limit=50`, {
    headers: {
      token: localStorage.getItem('userToken'),
    },
  });
}


  let {data , isLoading, error, isError} = useQuery({
    queryKey : ['getPosts'],
    queryFn : getAllPosts,
    select : (data) => data?.data?.posts
  });

  console.log(data);
  

  // console.log(data);
  
  if(isError){
    return <h1 className='ms-5'>{error.message}</h1>
  }
  
  if(isLoading){
    return <div className="spinner"></div>
  }
  
  return (
    <>
    <CreatePost/>
      {data?.map((post) => (
        <div   key={post?.id}  className='bg-slate-300 w-full md:w-[80%] lg:w-[60%] rounded-md mx-auto my-12'>
          <Link to={`/Postdetails/${post?.id}`} >        
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

              {data && <Comment comment={post?.comments[0]}/>}
          </Link>
              <CreateComment postId={post.id}/>
          </div>
      ))}
    </>
  )



}
