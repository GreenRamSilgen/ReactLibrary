import React from 'react';
import ReactDOM from 'react-dom';
//import {Router, Route} from 'react-router';
//import history from './history';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import './index.css';
import './App.css';
//import {Root} from './Root';
import * as serviceWorker from './serviceWorker';
import { Search } from './components/Search';
import { Home } from './components/Home';


class App extends React.Component{
  render(){
    return(
      <Router>
        <Switch>
          <Route path="/home">
            <Home/>
          </Route>
          <Route path="/search">
            <Search/>
          </Route>
          
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
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
