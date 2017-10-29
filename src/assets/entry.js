import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
console.log("wtf??");
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Home from './views/home';

console.log("reload?", Home);

const app = document.getElementById('content');

injectTapEventPlugin()

ReactDOM.render(
	<MuiThemeProvider>
	    <Router history={ hashHistory }>
	        <Route path = '/' component={ Home }/>
	    </Router>
  </MuiThemeProvider>
    ,
app);
