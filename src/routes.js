import React,{Component} from 'react';
import Home from './Home';
import About from './About';

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="about" component={About}/>
    </Route>
);

export default routes;