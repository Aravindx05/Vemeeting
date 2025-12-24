// import axios from "axios";
// import { httpStatus,Children,handleRegister, createContext,useContext, useState } from "react";
// import { useNavigate } from 'react-router-dom';

// export const AuthContext=createContext({});
// const client=axios.create({
//     baseURL:"http://localhost:8000/api/v1/users"
// })

// export const AuthProvider=({Children})=>{
//     const authContext=useContext(AuthContext);
//     const [userData,setUserData]=useState(authContext);
//     const handleRegister=async(name,username,password)=>{
//      try{
//         let request=await client.post("/register",{
//             name:name,
//             username:username,
//             password:password
//         })
//         if(request.status === httpStatus.CREATED){
//             return request.data.message;
//         }
//      }
//      catch(err){
//        throw err;
//      }
//     }
//     const router=useNavigate();
//     const data={
//         userData,setUserData,handleRegister
//     }
//     return(
//         <AuthContext.Provider value={data}>
//             {Children}
//         </AuthContext.Provider>
//     )
// }

import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
//import router from "../../../backend/src/routes/userRoutes";
import server from "../environment";
export const AuthContext = createContext({});

const client = axios.create({
    baseURL: `${server}/api/v1/users`
});

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(AuthContext);

    const router=useNavigate();

    const handleRegister = async (name, username, password) => {
        try {
            let request = await client.post("/register", {
                name: name,
                username: username,
                password: password
            });
            if (request.status === 201) { // use the numeric status code directly
                return request.data.message;
            }
        } catch (err) {
            throw err;
        }
    };
    const handlelogin = async (username, password) => {
        try {
            let request = await client.post("/login", {
                username: username,
                password: password
            });
    
            console.log("Request sent successfully");
            console.log(username, password)
            console.log(request.data)
            if (request.status === 200) {  
                localStorage.setItem("token", request.data.token);
                console.log(request.data);
                console.log("User logged in successfully");
                router("/home");
            }
        } catch (err) {
            console.error("Login failed", err);
        }
    };
    
    
    const getHistoryOfUser=async()=>{
        try{
            let request = await client.get("/get_all_activity",{
             params:{
                token:localStorage.getItem("token")
             }
            });
            return request.data;
        }
        catch(err){
          throw err;
        }
    }
    const addToUserHistory =async(meetingCode)=>{
        try{
            let request=await client.post("./add_to_activity",{
                token:localStorage.getItem("token"),
                meeting_code:meetingCode
            });
        return request;
        }
        catch(err)
        {
           throw err;
        }
    }
    const data = {
        userData, setUserData,getHistoryOfUser,addToUserHistory, handleRegister,handlelogin
    };
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};
