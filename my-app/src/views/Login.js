import React from 'react';

const handleLogin = (event) => {
  event.preventDefault();
  fetch('/api/auth/twitter', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

const Login = () => {
  return(
    <div>
      ooh welcome to the lovely login page!!!
      <form onSubmit={handleLogin}>
        <input type="submit"></input>
      </form>
    </div>
  )
}

export default Login
