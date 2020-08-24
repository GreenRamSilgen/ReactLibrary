import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';

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

const firebaseConfig = {
  apiKey: "AIzaSyBUJ_aPpBb3DcQq0h66FpBrDD0iR4I0yZg",
  authDomain: "reactlibrary-74152.firebaseapp.com",
  databaseURL: "https://reactlibrary-74152.firebaseio.com",
  projectId: "reactlibrary-74152",
  storageBucket: "reactlibrary-74152.appspot.com",
  messagingSenderId: "450026801744",
  appId: "1:450026801744:web:4d7aa1b13767187c2e9f55",
  measurementId: "G-3ZHXKKRC20"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

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
