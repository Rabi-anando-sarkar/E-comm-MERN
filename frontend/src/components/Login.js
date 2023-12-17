import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if(auth) {
            navigate('/');
        }
    });

    const handleLogin = async () => {
        console.log(email,password);
        let result = await fetch('http://localhost:8080/login', {
            method : 'post',
            body : JSON.stringify({
                usermail : email,
                userpass : password
            }),
            headers : {
                'Content-Type' : 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        if(result.authToken) {
            localStorage.setItem("user",JSON.stringify(result.data));
            localStorage.setItem("token",JSON.stringify(result.authToken));
            navigate('/');
        } else {
            alert('Please Enter Valid Details!');
        }
    }

  return (
    <div className='login'>
        <h1>Login</h1>
        <input
            type='email'
            placeholder='Enter Email'
            className='inputBox'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type='password'
            placeholder='Enter Password'
            className='inputBox'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button 
            className="signUpbutton" 
            type='button'
            onClick={handleLogin}
            >
                Login
        </button>
    </div>
  )
}

export default Login