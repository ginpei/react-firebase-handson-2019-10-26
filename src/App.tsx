import { createBrowserHistory } from 'history';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import AboutPage from './screens/AboutPage';
import HomePage from './screens/HomePage';
import NotFoundScreen from './screens/NotFoundScreen';

export const appHistory = createBrowserHistory();

const App: React.FC = () => {
  return (
    <Router history={appHistory}>
      <Switch>
        <Route exact={true} path="/" component={HomePage}/>
        <Route exact={true} path="/about" component={AboutPage}/>
        <Route component={NotFoundScreen}/>
      </Switch>
    </Router>
  );
};

export default App;
