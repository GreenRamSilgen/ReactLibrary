import React from 'react';
import './componentCSS/search.css'

class Result extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            popUp: false,
        }
        this.storeBook = this.storeBook.bind(this);
        this.bookAdded = this.bookAdded.bind(this);
        this.popModal = this.popModal.bind(this);

        this.counter = 0;
        this.timer = true;
    }

    storeBook(e, book){
        let myLibraryCount = (localStorage.getItem("myLibraryCount")) ? JSON.parse(localStorage.getItem("myLibraryCount")):0;
        let myLibrary = (localStorage.getItem("myLibrary")) ? JSON.parse(localStorage.getItem("myLibrary")) : [];
        
        book.read = false;
        book.key = myLibraryCount;
        myLibrary.push(book);
        myLibraryCount++;
        
        
        localStorage.setItem("myLibraryCount",JSON.stringify(myLibraryCount));
        localStorage.setItem("myLibrary",JSON.stringify(myLibrary));
        this.counter++;
        this.popModal();
    }
    
    popModal(){
        this.setState({
            popUp: !this.state.popUp,
        })
    }


    bookAdded(){
        this.timer = !this.timer;
        return(
            <div className={"bookAddedModal rando"+this.timer}>
                <p>Book Added To Your Library!</p>
            </div>
        );
    }

    render(){
        let pop = null;

        if(this.state.popUp && this.counter > 0){
            console.log("YO");
            pop =this.bookAdded();
        }else if(!this.state.popUp && this.counter > 0){
            console.log("lele");
            pop = this.bookAdded();
        }
        
        let bookCards = this.props.bookResults.map((book, idx)=>{
            return (
            <div className="bookCard" key={idx}>
                <div className="bookPicture">
                    <img src={(book.imgUrls) ? book.imgUrls.thumbnail : "https://icon-library.com/images/icon-book/icon-book-14.jpg"} alt={(book.imgUrls) ? "image of book titled " + book.title : "No Image"}/>
                </div>
                <div className="bookInfo">
                    <div className="bookInfoHead">
                        <div className="bookInfoHead__left">
                        <h3>{book.title}</h3>
                        <h5>By {book.authors[0]}</h5>
                        <p>Lang: {book.language.toString().toUpperCase()}</p>
                        </div>
                        <div className="bookInfoHead__right">
                            <p>Publish Date: {book.publishDate}</p>
                            <p>Publisher: {book.publisher}</p>
                        <p>Pages: ( {book.pageCount} )</p>
                        </div>
                    </div>
                <hr/>
                <p>{book.description}</p>
                </div>
                <div className="addBookBtn">
                <button type="button" className="btn btn-success" onClick={(e)=> this.storeBook(e, book)} currentbook={book}>ADD TO MY LIBRARY</button>
                </div>
            </div>
            );
        });
        return (
        <div>
            {pop}
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
                let bookObj = {
                    title: (bookInfo.title) ? bookInfo.title : "N/A",
                    authors: (bookInfo.authors) ? bookInfo.authors : ["N/A"],
                    description: (bookInfo.description) ? bookInfo.description : "No description available.",
                    pageCount: (bookInfo.pageCount) ? bookInfo.pageCount : "---",
                    imgUrls: (bookInfo.imageLinks === undefined) ? null : bookInfo.imageLinks,
                    language: (bookInfo.language) ? bookInfo.language : "---",
                    publisher: (bookInfo.publisher) ? bookInfo.publisher : "---",
                    publishDate: (bookInfo.publishedDate) ? bookInfo.publishedDate : "---",
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
                    <input type="text" className="form-control" onChange={this.handleChange} placeholder="Search Book Here"/>
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