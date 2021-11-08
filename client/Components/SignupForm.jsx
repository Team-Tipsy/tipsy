import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignupForm() {
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSignUp = (fn, ln, em, un, pw) => {
    console.log(JSON.stringify({ firstName: fn, lastName: ln, email: em, username: un, password: pw }));
    fetch('/signup', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: un, password: pw, firstName: fn, lastName: ln, email: em })
      // username, password, firstName, lastName, email
    }).then(() => {
      console.log('signed in')
      // get userId back, and create localStorage item
    })
  }
  
  return (
    <div>
      <div>
        <h2>First Name</h2>
        <form>
          <input
            id="first-name"
            type="text"
            placeholder="first name"
            onChange={(event) => setFirstName(event.target.value)}
          />
        </form>
        <h2>Last Name</h2>
        <form>
          <input
            id="last-name"
            type="text"
            placeholder="last name"
            onChange={(event) => setLastName(event.target.value)}
          />
        </form>
        <h2>Email</h2>
        <form>
          <input
            id="email"
            type="text"
            placeholder="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </form>
        <h2>Username</h2>
        <form>
          <input
            id="signup-username"
            type="text"
            placeholder="username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </form>
        <h2>Password</h2>
        <form>
          <input
            id="signup-password"
            type="text"
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </form>
      </div>
      <div>
        <button
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              return handleSignUp(firstName, lastName, email, username, password)
            }}>
            Sign up
        </button>
      </div>
      <div>
        <p>Have an account?</p>
        <Link to={
          { pathname: '/login' }
        }>Log in</Link> 
      </div>
    </div>
  )
}

export default SignupForm;
