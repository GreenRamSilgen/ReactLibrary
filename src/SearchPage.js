import {Book} from './Book'
import React from 'react';
function ResultDisplay(props){
    return props.booksToDisplay.map((book) =>(
        <div className="searchResultCard">
        <h1>{book.title}</h1>
        <h3>{book.authors}</h3>
        <p>{book.description}</p>
        </div>
    ));
}
export class SearchPage extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          value: '', 
          books: [],
        };
    
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.searchGoogle = this.searchGoogle.bind(this);

      this.bookResults = [];
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        this.searchGoogle();
    
        event.preventDefault();
      }
  
  
    searchGoogle(){
        this.setState({
            books: [],
        });
        fetch( "https://www.googleapis.com/books/v1/volumes?q="+this.state.value).then(res => res.json()).then((data) =>{
            if(!data.items) return;
            data.items.forEach((obj) =>{
                let arr = this.state.books.slice();
                arr.push(new Book(obj.volumeInfo.title, obj.volumeInfo.authors, obj.volumeInfo.description));
                this.setState({
                    books: arr
                })
            });
        })
    }
    render(){
    return (
        <div>
        <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.value} onChange={this.handleChange}></input>
            <input type="submit" value="Submit"></input>
        </form>
        <ResultDisplay booksToDisplay={this.state.books}/>
        </div>
    );
    }
  }
  
  