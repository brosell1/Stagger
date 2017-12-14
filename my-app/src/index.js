import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {BrowserRouter as Router} from 'react-router-dom';


ReactDOM.render(
  <Router>
    <MuiThemeProvider muiTheme={getMuiTheme({
      palette: {
        primary1Color: '#1de9b6',
        primary2Color: '#C5CAE9',
        // primary3Color: '#3F51B5',
        accent1Color: '#3F51B5',
        // accent2Color: '#1de9b6',
        accent3Color: '#00bfa5',
        textColor: '#212121',
        alternateTextColor: '#1de9b6',
        // canvasColor: white,
        borderColor: '#00bfa5',
        // disabledColor: fade('#424242', 0.3),
        // pickerHeaderColor: cyan500,
        // clockCircleColor: fade(darkBlack, 0.07),
        // shadowColor: fullBlack,
      }
    })}>
      <App />
    </MuiThemeProvider>
  </Router>, document.getElementById('root'));
registerServiceWorker();
