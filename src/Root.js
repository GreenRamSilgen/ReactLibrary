import React from 'react';
import './App.css';
import {Header} from './components/Header';
import {Home} from './components/Home'
import { Search } from './components/Search';

export class Root extends React.Component{
  render()
  {
    let loc = this.props.location.pathname;
    let loading;
    if(loc === "/home"){
      loading = <Home/>
    }
    else if(loc === "/search"){
      loading = <Search/>
    }
    else{
      loading = <Home/>
    }
    return (
      <div className="container">
        <div className="row bar">
          <div className="col-xs-10 col-xs-offset-1">
            <Header />
          </div>
        </div>
        <div className="row back">
          <div className="content">
            {loading}
          </div>
        </div>
      </div>
    );
  }
}