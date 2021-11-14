import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // login is a post request
  const handleLogin = ((username, password) => {
    console.log(JSON.stringify({ username, password }));
    
    // fetch is built into the browser
    fetch('/api/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
    // .then(response => response.json())
    .then((data) => {
      // check response format... need conditional if user is authenticated

      // if user is authenticated
        console.log('logged in')
        // set userId in local storage to persist through application
        localStorage.setItem('userId', 1);
        setMessage('Success!');
        // redirect user to home page
        window.location.href='http://localhost:8080/';
      // if user is not authenticated
        // setMessage('Invalid username/password. Please try again.');
        // console.log('Invalid username/password');
    })
  })

  return (
    <div>
      <div>
        <h2>Username</h2>
        <form>
          <input
            id="login-username"
            type="text"
            // placeholder="login username placeholder..."
            onChange={(event) => setUsername(event.target.value)}
          />
        </form>
        <h2>Password</h2>
        <form>
          <input
            id="login-password"
            type="password"
            // placeholder="login password placeholder..."
            onChange={(event) => setPassword(event.target.value)}
          />
        </form>
      </div>
      <div>
        <button
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            return handleLogin(username, password);
          }}>
          Log in
        </button>
      </div>
      <div>
        <p>{message}</p>
      </div>
      <div>
        <p>Don't have an account?</p>
        <Link to={
          { pathname: '/signup' }
        }>Sign up</Link>
      </div>
    </div>
  )
}

export default LoginForm;
