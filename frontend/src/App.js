import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import UserProfile from './components/pages/UserProfile';
import TableListing from './components/pages/TableListing';
import TableDetails from './components/pages/TableDetails';
import CreateTable from './components/pages/CreateTable';
import EditTable from './components/pages/EditTable';
import ActivityLog from './components/pages/ActivityLog';

function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/user-profile" component={UserProfile} />
          <Route exact path="/tables" component={TableListing} />
          <Route exact path="/tables/:id" component={TableDetails} />
          <Route exact path="/create-table" component={CreateTable} />
          <Route exact path="/edit-table/:id" component={EditTable} />
          <Route exact path="/activity-log" component={ActivityLog} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
