import React from 'react';
import Home from './Home';
import Login from './Login';
import Search from './Search';

// https://reactrouter.com/web/guides/quick-start
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Profile from './Profile';
import MakePost from './MakePost';
import Messaging from './messaging/Messaging';
import { Dashboard } from './Dashboard/Dashboard';
import Admin from './admin/Admin';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>    
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/search' component={Search}/>
                    <Route exact path='/help'/>
                    <Route exact path='/about'/>
                    {/* <Route path='/admin/:view' component={Admin}/> */}
                    <Route path='/profile/:userName' component={Profile}/>
                    <Route exact path='/post' component={MakePost}/>
                    <Route exact path='/signup'>
                        <Home page='signup'/>
                    </Route>
                    <Route exact path='/login'>
                        <Home page='login'/>
                    </Route>
                    <Route exact path='/messages' component={Messaging} />
                    {/* <Route>
                        <Home />
                    </Route> */}
                    <Route path="/admin" exact component={Dashboard}/>
                </Switch>
            </Router>
        )
    }
}