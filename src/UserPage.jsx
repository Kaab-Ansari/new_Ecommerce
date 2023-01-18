import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserPage() {
    const navigate = useNavigate()

     function logout(){
        localStorage.removeItem("token")
        navigate("/")
     }



    return(
        <div>
            <h1>Welcome {localStorage.getItem("firstname")} </h1>
            <button onClick={logout}>logout</button>
        </div>
    )
}