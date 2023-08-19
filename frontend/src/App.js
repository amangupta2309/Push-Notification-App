import React, { useContext } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './Login';
import PrivateRoute from './Route/PrivateRoute';
import PublicRoute from './Route/PublicRoute';
import CreateNotif from './CreateNotification/CreateNotif';
import Analytics from './Analytics/analytics';
import AddClient from './AddClient/addClient';
import Home from './Home';
import AlertCard from './AddClient/alert';

const App = ()=> {
  
  return (
    <div className="App">
      <Router>
        <AuthProvider>
            <Switch>
              <PublicRoute exact path="/login" component={Login} />
              <PrivateRoute path="/alert" component={AlertCard} />
              <PrivateRoute path="/addClient" component={AddClient} />
              <PrivateRoute path="/createnotif" component={CreateNotif} />
              <PrivateRoute path="/analytics" component={Analytics}/>
              <PublicRoute exact path="/" component={Home} />
            </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
