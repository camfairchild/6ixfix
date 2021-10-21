import React from 'react';
import Home from './Home';
import Login from './Login';
import Search from './Search';

// https://reactrouter.com/web/guides/quick-start
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>    
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/search' component={Search}/>
                    <Route exact path='/help'/>
                    <Route exact path='/about'/>
                    <Route exact path='/login' component={Login}/>
                    <Route>
                        <Home />
                    </Route>
                </Switch>
            </Router>
        )
    }
}