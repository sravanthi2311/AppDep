import React, { useRef, useState } from 'react'
import {Link} from "react-router-dom";

function Signup() {

    let firstNameInputRef=useRef();
    let lastNameInputRef=useRef();
    let ageInputRef=useRef();
    let emailInputRef=useRef();
    let passwordInputRef=useRef();
    let mobileNumberInputRef=useRef();
    let profilePicInputRef=useRef();
    let [profilePicPath,setProfilePicPath]=useState("./images/dummy.jpg")

    let onSignup=async()=>{

        let dataToSendJSO={
            firstName:firstNameInputRef.current.value,
            lastName:lastNameInputRef.current.value,
            age:ageInputRef.current.value,
            email:emailInputRef.current.value,
          password:passwordInputRef.current.value,
            mobileNumber:mobileNumberInputRef.current.value,
            profilePic:profilePicInputRef.current.value,
        }

        let dataToSendJSON=JSON.stringify(dataToSendJSO);

        let myHeaders=new Headers();
        myHeaders.append("content-type","application/json");

        let reqOptions={
            method:"POST",
            headers:myHeaders,
            body:dataToSendJSON,

        }



        let JSONData=await fetch("http://localhost:1111/signup",reqOptions)
        let JSOData=await JSONData.json();

         console.log(JSOData);



        // console.log(dataToSendJSO)
        // console.log(dataToSendJSON)

    }

    let onSignupURLEncoded=async()=>{
        let dataToSendURLE=new URLSearchParams()
        dataToSendURLE.append("firstName",firstNameInputRef.current.value);
        dataToSendURLE.append("lastName",lastNameInputRef.current.value);
        dataToSendURLE.append("age",ageInputRef.current.value);
        dataToSendURLE.append("email",emailInputRef.current.value);
        dataToSendURLE.append("password",passwordInputRef.current.value);
        dataToSendURLE.append("mobileNumber",mobileNumberInputRef.current.value);
        dataToSendURLE.append("profilePic",profilePicInputRef.current.value);

        let myHeaders=new Headers();
        myHeaders.append("content-type", "application/x-www-form-urlencoded")

        let reqOptions={
            method:"POST",
            headers:myHeaders,
            body:dataToSendURLE

        }

        let JSONData=await fetch("http://localhost:1111/signup",reqOptions)
        let JSOData=await JSONData.json();

        alert(JSOData.msg);
       
    }
    let onSignupFormData=async()=>{
        let dataToSendFD=new FormData()
        dataToSendFD.append("firstName",firstNameInputRef.current.value);
        dataToSendFD.append("lastName",lastNameInputRef.current.value);
        dataToSendFD.append("age",ageInputRef.current.value);
        dataToSendFD.append("email",emailInputRef.current.value);
        dataToSendFD.append("password",passwordInputRef.current.value);
        dataToSendFD.append("mobileNumber",mobileNumberInputRef.current.value);

        for(let i=0;i < profilePicInputRef.current.files.length;i++){
        dataToSendFD.append("profilePic",profilePicInputRef.current.files[i]);
        }
       

        let reqOptions={
            method:"POST",
           body:dataToSendFD

        }

        let JSONData=await fetch("http://localhost:1111/signup",reqOptions)
        let JSOData=await JSONData.json();

        alert(JSOData.msg);
       
    }
    

return (
    <div>
      <form>
        <div>
            <label>First Name</label>
            <input ref={firstNameInputRef}></input>
        </div>
        <div>
            <label>Last Name</label>
            <input ref={lastNameInputRef}></input>
        </div>
        <div>
            <label>Age</label>
            <input ref={ageInputRef}></input>
        </div>
        <div>
            <label>Email</label>
            <input ref={emailInputRef}></input>
        </div>
        <div>
            <label>Password</label>
            <input ref={passwordInputRef}></input>
        </div>
        <div>
            <label>Mobile Number</label>
            <input ref={mobileNumberInputRef}></input>
        </div>
        <div>
            <label>Profile Pic</label>
            <input type="file" ref={profilePicInputRef}  
             onChange={(e)=>{
                let selectedImagePath=URL.createObjectURL(e.target.files[0]);
                setProfilePicPath(selectedImagePath);
             }}></input>
            <br></br>
            <img src={profilePicPath} className="profilePicPreview" ></img>
            
        </div>

        <button type="button" onClick={()=>{
            onSignup();

        }}>SignUp(JSON)</button>

<button type="button" onClick={()=>{
          onSignupURLEncoded()

        }}>SignUp(URLEncoded)</button>

<button type="button" onClick={()=>{
       onSignupFormData()

        }}>SignUp(FormData)</button>


      </form>
      
            <p>Already have an account?<Link to="/"> Click here </Link> to login</p>
    </div>
  )
}

export default Signup
