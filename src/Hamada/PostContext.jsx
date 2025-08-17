import axios from "axios";
import { createContext } from "react";
// import { PostContext } from './PostContext';



export let PostContext = createContext();


export default function PostContextProvider(props){
    

    function getAllPosts(){
        return  axios
        .get(`https://linked-posts.routemisr.com/posts?limit=50` ,{
            headers : {
                token : localStorage.getItem("userToken"),
            },
        })
        .then((res) =>  {
            console.log(res);
            
            // console.log(res.data.post);
            // return res.data.post
        })
        .catch((err) => {
            console.log(err);
            // return err.data.post;
        });
    }


    return (
        <PostContext.Provider value={{getAllPosts}}>
            {props.children}
        </PostContext.Provider>
    )
}