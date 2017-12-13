import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const handleLogin = (event) => {
  event.preventDefault();
  fetch('/api/auth/twitter', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

const Login = (props) => {
  return(
    <div style={{textAlign:'center'}}>
      <p className="tagline">
        Social media scheduling with intelligent tagging
      </p>
      {/* <form onSubmit={handleLogin}>
        <input type="submit"></input>
      </form> */}
        <RaisedButton
          onClick={props.login}
          className="button"
          target="_blank"
          label="Facebook Login"
          secondary={true}
          disabled={true}
        /><br/><br/>
        <RaisedButton
          onClick={props.login}
          className="button"
          target="_blank"
          label="Twitter Login"
          secondary={true}
        />
      <div className='footer'>Brought to you by Sharon Fruit and Big Ben</div>
    </div>
  )
}

export default Login
