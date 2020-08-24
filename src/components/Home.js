import React from "react";
import "./componentCSS/home.css";
import { SingleBookDisplay } from "./SingleBookDisplay";
import firebase from "firebase";
import { Header } from "./Header";

class ShelfBook extends React.Component {
  render() {
    return (
      <div className={this.props.book.read ? "shelfBook read" : "shelfBook"}>
        <div className="shelfBookLeft">
          <img
            className="singleBookImg"
            onClick={this.props.singleImgClicked}
            src={
              this.props.book.imgUrls
                ? this.props.book.imgUrls.thumbnail
                : "https://icon-library.com/images/icon-book/icon-book-14.jpg"
            }
            alt={
              this.props.book.imgUrls
                ? "image of book titled " + this.props.book.title
                : "No Image"
            }
          />
          <button
            type="button"
            className="btn btn-danger shelfBtn"
            onClick={this.props.handleBookRemove}
          >
            Remove
          </button>
        </div>
        <div className="bookPlaque">
          <h5 className="bookTitle">{this.props.book.title}</h5>
          <p>By: {this.props.book.authors[0]} </p>
          <p>Lang: {this.props.book.language.toString().toUpperCase()}</p>
          <p>Publish:{this.props.book.publisher}</p>
          <p>Publish Date: {this.props.book.publishDate}</p>
        </div>
      </div>
    );
  }
}

export class Home extends React.Component {
  constructor(props) {
    super(props);
    let fireBaseData = [];
    firebase
      .firestore()
      .collection("books")
      .get()
      .then((bookCollection) => {
        bookCollection.docs.map((doc) => fireBaseData.push(doc.data()));
        this.setState({
          myBooks: fireBaseData,
        });
      });

    this.state = {
      myBooks: [],
      displaySingle: false,
      singleBookToDisplay: "",
      sortTitle: "true", //true = a->z , false = z->a
      readType: "All", //readOnly,  unreadOnly , All
    };

    this.singleBookClicked = this.singleBookClicked.bind(this);
    this.changeSingleBookRead = this.changeSingleBookRead.bind(this);
    this.removeSingleBook = this.removeSingleBook.bind(this);
    this.filterSubmit = this.filterSubmit.bind(this);
    this.backHome = this.backHome.bind(this);
  }

  singleBookClicked(book) {
    this.setState({
      displaySingle: true,
      singleBookToDisplay: book,
    });
  }

  changeSingleBookRead() {
    let idxToChange = this.state.myBooks.findIndex(
      (book) => book.key === this.state.singleBookToDisplay.key
    );
    let myBooksCpy = this.state.myBooks;
    myBooksCpy[idxToChange].read = !myBooksCpy[idxToChange].read;

    let bookRef = firebase
      .firestore()
      .collection("books")
      .doc(`${this.state.singleBookToDisplay.key}`);
    console.log(this.state.singleBookToDisplay.key);
    bookRef.update({
      read: myBooksCpy[idxToChange].read,
    });
    console.log(myBooksCpy[idxToChange].read);
  }

  removeSingleBook(key) {
    let idxToChange = this.state.myBooks.findIndex((book) => book.key === key);
    let myBooksCpy = this.state.myBooks;
    myBooksCpy.splice(idxToChange, 1);

    this.setState({ myBooks: myBooksCpy });

    let docRef = firebase.firestore().collection("books").doc(`${key}`);
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log(doc.data());
          docRef.delete();
          let keyRef = firebase
            .firestore()
            .collection("lastKey")
            .doc("vu6ozebIpVhs6SZNnyyO");
          let oldKey;
          keyRef.get().then((doc) => {
            oldKey = doc.data().key;
            keyRef.update({
              key: Number(oldKey) - 1,
            });
          });
        }
      })
      .catch(function (error) {
        console.log("Error getting document: ", error);
      });
  }

  filterSubmit(e) {
    e.preventDefault();
    console.log(this.refs.abSort.value);
    this.setState({
      sortTitle: this.refs.abSort.value,
      readType: this.refs.displayRead.value,
    });
  }

  backHome(){
      this.setState({
          displaySingle: false
      })
  }
  render() {
    if (this.state.displaySingle) {
      return (
        <div className="container">
          <div className="row bar">
            <div className="col-xs-10 col-xs-offset-1">
              <Header goHome={this.backHome}/>
            </div>
          </div>
          <SingleBookDisplay
            singleBook={this.state.singleBookToDisplay}
            readStatusChange={this.changeSingleBookRead}
          />
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="row bar">
            <div className="col-xs-10 col-xs-offset-1">
              <Header />
            </div>
          </div>
          <div className="row back">
            <div className="content">
              <div className="homeContent">
                <div className="homeHeader">MY BOOKS:</div>

                <form onChange={this.filterSubmit}>
                  <label htmlFor="sortBy">Sort By: </label>
                  <select id="sortBy" name="sortBy" ref="abSort">
                    <option value="true">A-Z</option>
                    <option value="false">Z-A</option>
                  </select>

                  <label htmlFor="displayRead">Display:</label>
                  <select id="displayRead" name="displayRead" ref="displayRead">
                    <option value="All">All</option>
                    <option value="readOnly">Read</option>
                    <option value="unreadOnly">Unread</option>
                  </select>
                </form>

                <div className="bookShelf">
                  {this.state.myBooks
                    .sort((a, b) => {
                      //sort based on state
                      if (this.state.sortTitle === "true")
                        return a.title > b.title ? 1 : -1;
                      return a.title > b.title ? -1 : 1;
                    })
                    .map((book) => {
                      //display read only
                      if (this.state.readType === "readOnly") {
                        return book.read ? book : null;
                      } else if (this.state.readType === "unreadOnly") {
                        return book.read ? null : book;
                      } else {
                        return book;
                      }
                    })
                    .map((book) => {
                      if (book === null) return null;
                      return (
                        <ShelfBook
                          key={book.key}
                          book={book}
                          singleImgClicked={() => this.singleBookClicked(book)}
                          handleBookRemove={() =>
                            this.removeSingleBook(book.key)
                          }
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
