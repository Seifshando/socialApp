import { createContext, useState } from "react";


export let UserContext = createContext();


export default function UserContextProvider(props){

    const [userLogin, setuserLogin] = useState(localStorage.getItem("userToken"));

    return(
        <UserContext.Provider value={{setuserLogin, userLogin}}>
            {props.children}
        </UserContext.Provider>
    )
}