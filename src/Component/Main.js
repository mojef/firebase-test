import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Home from './Home';
import Add from './Add';
import Upload from './Upload';
import Lookup from './Lookup';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Main extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <HashRouter>
                        <div>
                            <nav className={'deep-purple darken-1'}>
                                <div className={"nav-wrapper"}>
                                    <ul className={'left'}>
                                        <li><NavLink to="/">Home</NavLink></li>
                                        <li><NavLink to="/add">Add Row</NavLink></li>
                                        <li><NavLink to="/lookup">Lookup</NavLink></li>
                                        <li><NavLink to="/upload">Upload CSV</NavLink></li>
                                    </ul>
                                </div>

                            </nav>
                            <div className="content container">
                                <Route exact path="/" component={Home} />
                                <Route path="/add" component={Add} />
                                <Route path="/lookup" component={Lookup} />
                                <Route path="/upload" component={Upload} />
                            </div>
                        </div>
                    </HashRouter>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Main;