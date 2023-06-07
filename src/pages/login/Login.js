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

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        if (user.name === username && user.password === password) {
          // dispatch({
          //   type: 'setUser',
          //   user: user
          // })
          dispatch({
            type: 'setLogIn',
            logedIn: true
          })
          Cookies.set('user', user._id)
          navigate('/')
          // dispatch({type: 'update'})
        }
        else (alert("failed login"))
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
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default LoginForm;
