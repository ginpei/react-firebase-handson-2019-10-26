import firebase from 'firebase/app';
import 'firebase/firestore';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import AboutPage from './screens/AboutPage';
import HomePage from './screens/HomePage';
import NotFoundScreen from './screens/NotFoundScreen';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
});

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
