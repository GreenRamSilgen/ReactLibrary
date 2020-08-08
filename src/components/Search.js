import React from 'react';
import './search.css'
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
        console.log(this.state.searchQuery);
        //
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
                <p>RESULT HERE</p>
            </div>
            </div>
        )
    }
}