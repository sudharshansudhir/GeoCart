import { createContext, useState } from "react";

export const AppProvider=createContext()

export const AppContext=({children})=>{
    const [login,setLogin]=useState(false)
    return (
        <AppProvider.Provider value={{login,setLogin}}>{children}</AppProvider.Provider>
    )
}