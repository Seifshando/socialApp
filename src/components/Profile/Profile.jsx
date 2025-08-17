import React from 'react'
import style from './Profile.jsx'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import UserProfile from '../UserProfile/UserProfile.jsx';
import CreatPost from '../CreatePost/CreatePost.jsx';
import CreatePost from '../CreatePost/CreatePost.jsx';
import ChangePassword from './../ChangePassword/ChangePassword';
import UploadProfilePhoto from '../UploadProfilePhoto/UploadProfilePhoto.jsx';

export default function Profile() {

  function getUserData(){
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers : {
        token : localStorage.getItem('userToken'),
      },
    });
  }




  let {data, error, isError, isLoading} = useQuery( {
    queryKey : ['getProfileData'],
    queryFn : getUserData,
    select : (data) => data?.data?.user
  });

  // console.log(data);
  


  return (
    <>
    <div className='border-2 rounded-lg p-4 text-center bg-slate-500 border-slate-900 w-full md:w-[80%] lg:w-[60%] mx-auto'>
      <img src={data?.photo} className='size-[50px] mx-auto mb-3' alt={data?.name} />
      <p>Name: {data?.name}</p>
      <p>Gender: {data?.gender}</p>
      <p>Email: {data?.email}</p>
      <p>Birthday: {data?.dateOfBirth}</p>
      <ChangePassword />
      <UploadProfilePhoto />
    </div>
      {data && <UserProfile id={data?._id}/>}
    </>      
  )
}
