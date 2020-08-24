import React from 'react';
import {Link} from 'react-router-dom';

export class Header extends React.Component{
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header nav--spacer">
                        <ul className="nav navbar-nav">
                            <li><Link to="/home" onClick={this.props.goHome}>Home</Link></li>
                        </ul>
                    </div>
                    <div className="navbar-header nav--spacer">
                        <ul className="nav navbar-nav">
                            <li><Link to="/search">Search</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}