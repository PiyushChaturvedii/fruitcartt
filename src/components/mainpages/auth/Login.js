import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [user, setUser] = useState({
        email:'', password:''
    })

    const onChangeInput = e => {
        const {name, value} = e.target;
        setUser({...user, [name]: value})
    }

    const loginSubmit = async e => {
        e.preventDefault()
        try{
            await axios.post('user/login', {...user})
            localStorage.setItem('firstLogin', true)
            window.location.href = "/";
        }catch(err){
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-page">
            <h2>Login</h2>
            <form onSubmit={loginSubmit} >
                <input type="email" name="email" placeholder="Email" required value={user.email} onChange={onChangeInput} />
                <input type="password" name="password" placeholder="Password" required value={user.password} autoComplete="on" onChange={onChangeInput} />
                
                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/register">Register</Link>
                </div>
                <div>
                    <h7>*Enter user - "admin@gmail.com"</h7>
                    <br/>
                    <h7>Password - "123456" for login as Admin.</h7><br/>
                    <h7>*Normal user register yourself first.</h7>
                </div>
            </form>
        </div>
    )
}

export default Login
