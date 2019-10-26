import firebase from 'firebase/app';
import 'firebase/firestore';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import AboutPage from './screens/AboutPage';
import HomePage from './screens/HomePage';
import NoteCreatePage from './screens/NoteCreatePage';
import NoteEditPage from './screens/NoteEditPage';
import NoteListPage from './screens/NoteListPage';
import NoteViewPage from './screens/NoteViewPage';
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
        <Route exact={true} path="/notes" component={NoteListPage}/>
        <Route exact={true} path="/notes/create" component={NoteCreatePage}/>
        <Route exact={true} path="/notes/:id" component={NoteViewPage}/>
        <Route exact={true} path="/notes/:id/edit" component={NoteEditPage}/>
        <Route component={NotFoundScreen}/>
      </Switch>
    </Router>
  );
};

export default App;
