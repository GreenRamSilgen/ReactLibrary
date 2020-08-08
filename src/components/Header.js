import React from 'react';

export class Header extends React.Component{
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header nav--spacer">
                        <ul className="nav navbar-nav">
                            <li><a href="/home">Home</a></li>
                        </ul>
                    </div>
                    <div className="navbar-header nav--spacer">
                        <ul className="nav navbar-nav">
                            <li><a href="/search">Search</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}