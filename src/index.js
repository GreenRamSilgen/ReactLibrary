import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Fragment} from 'react';

import {SearchPage} from './SearchPage'
class Navbar extends React.Component{

  render(){
    return (
      <div>
        <button onClick={this.props.bodyToMyBooks}>My Books</button>
        <button onClick={this.props.bodyToSearch}>Search</button>
      </div>
    );
  }
}




class App extends React.Component{
  constructor(props){
    super(props);
    
    this.bodyToMyBooks = this.bodyToMyBooks.bind(this);
    this.bodyToSearch = this.bodyToSearch.bind(this);
    this.bodyLoader = this.bodyLoader.bind(this);
    this.state = {
      bodyToLoad: 1, //1 = my books, 2 = search, 3 
    }
  }

  bodyToMyBooks(){
    this.setState({
      bodyToLoad: 1,
    })
  }
  bodyToSearch(){
    this.setState({
      bodyToLoad: 2,
    })
  }

  bodyLoader(){
    if(this.state.bodyToLoad === 1){
      return (<div>KOKOKO</div>);
    }
    else if(this.state.bodyToLoad === 2){
      return (<SearchPage/>);
    }
  }
  render(){
    return (
      <Fragment>
      <Navbar bodyToMyBooks={this.bodyToMyBooks} bodyToSearch={this.bodyToSearch}/>
      <SearchPage/>
      </Fragment>
    );
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
