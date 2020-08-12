import React from 'react';
import './componentCSS/singlebook.css'

export class SingleBookDisplay extends React.Component{
    constructor(props){
        super(props);
        this.state={
            read: (this.props.singleBook.read) ? true : false,
        }

        this.toggleRead = this.toggleRead.bind(this);
    }

    toggleRead(){
        this.props.readStatusChange();        
        this.setState({
            read: !(this.state.read),
        });
    }


    render(){
        return(
            <div className="singleBookConent">
                <div className="singleBookLeft">
                    <div className="singleBookImgHolder">
                        <img src={(this.props.singleBook.imgUrls) ? this.props.singleBook.imgUrls.thumbnail : "https://icon-library.com/images/icon-book/icon-book-14.jpg"} alt={(this.props.singleBook.imgUrls) ? "image of book titled " + this.props.singleBook.title : "No Image"}/>
                    </div>
                    <div className="singleBookInfo">
                        <h3>{this.props.singleBook.title}</h3>
                        <h5>By {this.props.singleBook.authors[0]}</h5>
                        <p>Lang: {this.props.singleBook.language.toString().toUpperCase()}</p>
                        <p>Publish Date: {this.props.singleBook.publishDate}</p>
                        <p>Publisher: {this.props.singleBook.publisher}</p>
                        <p>Pages: ( {this.props.singleBook.pageCount} )</p>
                    </div>
                </div>
                <div className="singleBookDescription">
                    <h4>Description:</h4>
                    <h5>{this.props.singleBook.description}</h5>
                </div>
                <div className="singleBookButtons">
                    <h4>Status: {(this.state.read) ? "Read" : "Not Read"}</h4>
                    <button type="button" className="btn btn-info" onClick={this.toggleRead}>Change Status</button>
                </div>
            </div>
        );
    }
}