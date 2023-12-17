import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if(auth) {
            navigate('/');
        }
    });

    const collectedData = async () => {
        console.log(name,email,password);
        let result = await fetch('http://localhost:8080/signup',{
            method : 'post',
            body : JSON.stringify({
                username : name,
                usermail : email,
                userpass : password,
            }),
            headers : {
                'Content-Type' : 'application/json'
            }
        });

        result = await result.json();
        console.log(result);
        if(result) {
            localStorage.setItem("user",JSON.stringify(result.result));
            localStorage.setItem("token",JSON.stringify(result.authToken));
            navigate('/');
        }
    }
  return (
    <div className='signupPage'>
        <h1>Sign Up</h1>
        <input 
            className='inputBox' 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            type='text' 
            placeholder='Enter Name'
        />
        <input 
            className='inputBox' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            type='email' 
            placeholder='Enter Email'
        />
        <input 
            className='inputBox' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            type='password' 
            placeholder='Enter Password'
        />
        <button 
            className="signUpbutton" 
            type='button'
            onClick={collectedData}
            >
                Sign Up
        </button>
    </div>
  )
}

export default SignUp
