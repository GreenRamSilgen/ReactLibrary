import React from 'react';
import './search.css'

class Result extends React.Component{
    render(){
        let bookCards = this.props.bookResults.map((book)=>{
            return (
            <div className="bookCard">
                <div className="bookPicture">
                    <img src={(book.imgUrls) ? book.imgUrls.thumbnail : "#"} alt={(book.imgUrls) ? "image of book titled " + book.title : "No Image"}/>
                </div>
                <div className="bookInfo">
                    <div className="bookInfoHead">
                        <div className="bookInfoHead__left">
                        <h3>{book.title}</h3>
                        <h5>By {(book.authors) ? book.authors[0] : "N/A"}</h5>
                        </div>
                        <div className="bookInfoHead__right">
                            {/**
                             * PUBLISHER ANE PUBLISH DATE HERE INSERT
                             */}
                        <p>Pages: ( {(book.pageCount) ? book.pageCount : "---"} )</p>
                        </div>
                    </div>
                <hr/>
                <p>{book.description}</p>
                </div>
                <div className="addBookBtn">
                <button type="button" class="btn btn-success">ADD TO MY LIBRARY</button>
                </div>
            </div>
            );
        });
        return (
        <div>
            {bookCards}
        </div>
        );
    }
}
export class Search extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchQuery:'',
            results: [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({searchQuery: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        let resultsCopy = [];
        

        fetch("https://www.googleapis.com/books/v1/volumes?q="+this.state.searchQuery).then(res => res.json()).then((response) =>{
        if(!response.items) return;    
        response.items.forEach((book)=>{
                let bookInfo = book.volumeInfo;
                console.log(bookInfo);
                console.log(bookInfo.imageLinks);
                let bookObj = {
                    title: bookInfo.title,
                    authors: bookInfo.authors,
                    description: bookInfo.description,
                    pageCount: bookInfo.pageCount,
                    imgUrls: (bookInfo.imageLinks === undefined) ? null : bookInfo.imageLinks,
                    language: bookInfo.language
                };
                resultsCopy.push(bookObj);
            });
        }).then(()=>{
            this.setState({
                results: resultsCopy,
            });
            console.log(this.state.results);
        });
    }


    render() {
        return (
            <div className="searchPageContent">
            <div className="searchBar">
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                    <input type="text" className="form-control" onChange={this.handleChange} placeholder="Enter Book Here"/>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Search"/>
                </form>
            </div>
            <div className="resultDisplay">
                {/*IMPLEMENT THE RESULT MODULE TO DISPLAY ALL THE RESULTS*/}
                {<Result bookResults={this.state.results}/>}
            </div>
            </div>
        )
    }
}