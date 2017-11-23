import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, hashHistory } from 'react-router';
import Home from './views/HomeView';
import RecommendationView from './views/RecommendationView';
import PortalView from './views/PortalView';

const app = document.getElementById('app');

injectTapEventPlugin()

ReactDOM.render(
	<MuiThemeProvider>
	    <Router history={ hashHistory }>
	        <Route path = '/' component={ Home }/>
					<Route path = '/recommend' component = { RecommendationView }/>
					<Route path = '/portal' component = { PortalView }/>
	    </Router>
  </MuiThemeProvider>
    ,
app);
