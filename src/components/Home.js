import React from 'react';
import './componentCSS/home.css'

class ShelfBook extends React.Component{
    render(){
        return(
            <div className={(this.props.book.read)?"shelfBook read" : "shelfBook"}>
            <img src={(this.props.book.imgUrls) ? this.props.book.imgUrls.thumbnail : "https://icon-library.com/images/icon-book/icon-book-14.jpg"} alt={(this.props.book.imgUrls) ? "image of book titled " + this.props.book.title : "No Image"}/>
            <div className="bookPlaque">
                <h5>{this.props.book.title}</h5>
                <p>By: {this.props.book.authors[0]} </p>
                <p>Lang: {this.props.book.language.toString().toUpperCase()}</p>
                <p>Publish:{this.props.book.publisher}</p>
                <p>Publish Date: {this.props.book.publishDate}</p>
            </div>
        </div>
        );
    }
}
export class Home extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            myBooks: (localStorage.getItem("myLibrary")) ? JSON.parse(localStorage.getItem("myLibrary")) : [],
            sortTitle: true, //true = a->z , false = z->a
            readType: "All", //readOnly,  unreadOnly , All
        }
        console.log(this.state.myBooks);
    }
    render() {
        // this.state.myBooks.sort(function(a, b){
        //     return a.title - b.title;
        // });
        return (
            <div className="bookShelf">
                {this.state.myBooks.sort((a,b) =>{//sort based on state
                    if(this.state.sortTitle) return (a.title > b.title)?1:-1;
                    return (a.title>b.title)?-1:1;
                }).map((book)=>{//display read only 
                    if(this.state.readType === "readOnly"){
                        return (book.read) ? book : null; 
                    }else if(this.state.readType === "unreadOnly"){
                        return (book.read) ? null : book;
                    }
                    else{
                        return book;
                    }
                }).map((book)=>{
                    if(book === null) return null;
                    return(
                        <ShelfBook key={book.key} book={book}/>
                    )
                })}
            </div>
        )
    }
}