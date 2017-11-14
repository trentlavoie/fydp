import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, hashHistory } from 'react-router';
import Home from './views/home';

const app = document.getElementById('app');

injectTapEventPlugin()

ReactDOM.render(
	<MuiThemeProvider>
	    <Router history={ hashHistory }>
	        <Route path = '/' component={ Home }/>
	    </Router>
  </MuiThemeProvider>
    ,
app);
