import React, { useState } from 'react';
import '../styles/login.css'; // Import the CSS file

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // try {
    //   const response = await fetch('/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ username, password }),
    //   });

    //   if (response.ok) {
    //     console.log('Login successful');
    //     // Perform actions after successful login
    //   } else if (response.status === 401) {
    //     console.log('Invalid username or password');
    //     // Perform actions for invalid credentials
    //   } else {
    //     console.log('An error occurred');
    //     // Perform actions for other error cases
    //   }
    // } catch (error) {
    //   console.error('An error occurred:', error);
    //   // Perform actions for error cases
    // }
    Login();

    setUsername('');
    setPassword('');
  };

  const Login = () => {
    fetch("http://localhost:4000/api/users?name=" + username)
    .then(res => res.json())
    .then(user => {
      if(user.name === username && user.password === password) {
      alert("logedIn")}
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
