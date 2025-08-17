import { createContext, useState } from "react";


export let Context = createContext();

export default function ContextProvider(props){

    const [counter, setcounter] = useState(0)

    function changeCount(){
        setcounter(Math.round(Math.random() * 100));
    }

    return (
        <Context.Provider value={{counter, changeCount}}>
            {props.children}
        </Context.Provider>
    )
}