import React from 'react';

import TwitterLogin from 'react-twitter-auth';
import RaisedButton from 'material-ui/RaisedButton';

// const handleLogin = (event) => {
//   event.preventDefault();
//   fetch('/api/auth/twitter', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//   });
// };

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
        <TwitterLogin
          loginUrl="http://localhost:5000/api/auth/twitter"
          onFailure={props.onFailed} onSuccess={props.onSuccess}
          requestTokenUrl="http://localhost:5000/api/auth/twitter/reverse"
        />
        <RaisedButton
          // onClick={props.login}
          onClick={() => {window.location = "http://localhost:5000/api/auth/twitter"}}
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
