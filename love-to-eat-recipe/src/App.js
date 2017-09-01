import React, { Component } from 'react';
//import logo from './logo.svg';
import {Link} from 'react-router';
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="container">
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Food Recipe.</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            <li className="active"><Link to="/">Home</Link></li>
                            <li><Link to="/submit">Submit a recipe</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
            {this.props.children}
        </div>
    );
  }
}

export default App;
