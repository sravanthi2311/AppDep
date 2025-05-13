import React, { useRef} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";


function Login() {

    
    let emailInputRef=useRef();
    let passwordInputRef=useRef();
    let navigate=useNavigate();
    let dispatch=useDispatch();
   
   let onLogin=async()=>{
        let dataToSendFD=new FormData()
        
        dataToSendFD.append("email",emailInputRef.current.value);
        dataToSendFD.append("password",passwordInputRef.current.value);
        
        

        let reqOptions={
            method:"POST",
           body:dataToSendFD

        }

        let JSONData=await fetch("http://localhost:1111/login",reqOptions)
        let JSOData=await JSONData.json();

        console.log(JSOData);

        if(JSOData.status=="success"){
            dispatch({type:"login",data:JSOData.data});
            navigate("/dashboard");

        }else{
            alert(JSOData.msg);

        }

      
       
    }
    

return (
    <div>
      <form>
        
        <div>
            <label>Email</label>
            <input ref={emailInputRef}></input>
        </div>
        <div>
            <label>Password</label>
            <input ref={passwordInputRef}></input>
        </div>
        
<button type="button" onClick={()=>{
       onLogin()

        }}>Login</button>


      </form>
      <p>Don't have an account?<Link to="/signup"> Click here </Link> to create account</p>
    </div>
  )
}

export default Login
