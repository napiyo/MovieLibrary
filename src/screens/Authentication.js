import React, { useEffect, useRef, useState } from 'react'
import '../stylesheets/authentication.css'
import auth from '../firebaseConfig'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword ,onAuthStateChanged} from "firebase/auth";
import { useNavigate } from 'react-router';

// import { useHistory} from 'react-router-dom'
// import { Navigate } from "react-router-dom";


export default function Authentication() {


    const leftContainer = useRef(null);
const rightContainer = useRef(null);
const leftOverlay = useRef(null);
const rightOverlay = useRef(null);

function slideLeft(){
        // leftContainer.current.style.transform='translate(100%)';
        leftContainer.current.style.opacity=0;
        leftContainer.current.style.zIndex=0;
        //  rightContainer.current.style.transform='translate(-100%)';
        rightContainer.current.style.opacity=1;
        rightContainer.current.style.zIndex=1;
          rightOverlay.current.style.transform='translate(-100%)';
    rightOverlay.current.style.opacity=0;
    rightOverlay.current.style.zIndex=0;

    // rightOverlay.current.style.opacity=1;
    leftOverlay.current.style.opacity=1;
    leftOverlay.current.style.zIndex=1;
        
        
}

function slideRight(){
    
    leftContainer.current.style.opacity=1;
    leftContainer.current.style.zIndex=1;
    //  rightContainer.current.style.transform='translate(-100%)';
    rightContainer.current.style.opacity=0;
    rightContainer.current.style.zIndex=0;
    rightOverlay.current.style.transform='translate(0%)';
    rightOverlay.current.style.opacity=1;
    rightOverlay.current.style.zIndex=1;
    leftOverlay.current.style.opacity =0;
    leftOverlay.current.style.zIndex =0;

    
}


const [loginEmail, setloginEmail] = useState("");
const [loginPassword, setloginPassword] = useState("")
const [signupEmail, setsignupEmail] = useState("")
const [signupPassword, setsignupPassword] = useState("")
const [loading, setloading] = useState(true)
const navigate = useNavigate();
const login=()=>{

if(loginEmail.length===0 || loginPassword.length===0){
    return;
}
signInWithEmailAndPassword(auth,loginEmail,loginPassword).then((credential)=>{
    

   

}).catch((e)=>{
    alert(e.message)
})
                
}
const createUser=()=>{
if(loginEmail.length===0 || loginPassword.length===0){
    return;
}
createUserWithEmailAndPassword(auth,signupEmail,signupPassword).then((credential)=>{
   
}).catch((e)=>{
    alert(e.message)
})
                
}

useEffect(() => {
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        navigate("/",{replace:true})
        // ...
      }
      setloading(false); 
    });
}, [])


if(loading){
    return <div className="loadingContainer">
       <div className="loader"></div>
       <div>Catching up with firebase, please wait</div>
    </div>
}
else{
    return (
            
        <div id="mainBackground">
        
             <div className="mainContainer">
               <div className="leftContainer" ref={leftContainer}>
                  <div className="loginContent">
                                    <h1 style={{textAlign:'center',marginBottom:'-10px'}}>LOG IN</h1>
<p  style={{textAlign:'center',marginBottom:'10px'}}>get all movies details</p>
                    <input type='email' placeholder="Email" value={loginEmail} onChange={(e)=>{setloginEmail(e.target.value)}}></input>
                    <input type='password' placeholder="Password" value={loginPassword} onChange={(e)=>{setloginPassword(e.target.value)}}></input>
                    <button id='logInBtn' onClick={login}>LOGIN</button>
                  </div>
                   
               </div>
               <div className="leftOverlay" ref={leftOverlay}>
                   <h1>
                       Already have an Account ??
                       
                   </h1>
                   <button id="slideRight" onClick={slideRight}>Log in here</button>
               </div>
               <div className="rightContainer" ref={rightContainer}>
               <div className="SignupContent">
                                    <h1 style={{textAlign:'center',marginBottom:'-10px'}}>SIGN IN</h1>
<p  style={{textAlign:'center',marginBottom:'10px'}}>get all movies details</p>
                    <input type='email' placeholder="Email" value={signupEmail} onChange={(e)=>{setsignupEmail(e.target.value)}}></input>
                    <input type='password' placeholder="Password" value={signupPassword} onChange={(e)=>{setsignupPassword(e.target.value)}}></input>
                    <button id='signupBtn' onClick={createUser}>SIGN UP</button>
                  </div>
               </div>
               <div className="rightOverlay" ref={rightOverlay}>
                

                   <h1>
                       Dont have an Account yet ??
                       
                   </h1>
                   <button id="slideLeftBtn" onClick={slideLeft}>Sign up here</button>
                
               </div>

             </div>
             
        </div>
    )}
    }
