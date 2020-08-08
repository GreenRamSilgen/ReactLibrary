import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';
import history from './history';

import './index.css';
import {Root} from './Root';
import * as serviceWorker from './serviceWorker';


class App extends React.Component{
  render(){
    return(
      <Router history={history}>
        <Route exact path={"/"} component={Root}/>
        
        <Route path={"/home"} component={Root}/>
        <Route path={"/search"} component={Root}/>
      </Router>
    );
  }
}
ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
