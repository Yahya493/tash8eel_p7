import React, { useState } from 'react';
import './login.css'; // Import the CSS file
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const [userNameValidation, setUserNameValidation] = useState('')
  const [passwordValidation, setPasswordValidation] = useState('')

  const ValidateInput = () => {
    if(username === '') {
      setUserNameValidation('required')
      return false
    }
    setUserNameValidation('')
    if(password === '') {
      setPasswordValidation('required')
      return false
    }
    setPasswordValidation('')
    return true
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!ValidateInput()) return
    Login();
    // setUsername('');
    // setPassword('');
  };

  const Login = () => {
    fetch("http://localhost:4000/api/users", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: username
      })
    })
      .then(res => res.json())
      .then(user => {
        if(Object.keys(user).length === 0) {
          setUserNameValidation('invalide user name')
          return
        }
        if (user.password !== password) {
          setPasswordValidation('incorrect password')
          return
        }
          dispatch({
            type: 'setLogIn',
            logedIn: true
          })
          Cookies.set('user', user._id /*, { expires: 3650 }*/)
          navigate('/')
      })
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div>
        <h2>Login</h2>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <p className='inputValidation'>{userNameValidation}</p>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <p className='inputValidation'>{passwordValidation}</p>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default LoginForm;
