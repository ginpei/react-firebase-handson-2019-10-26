import NiceMarkdown from '@ginpei/react-nice-markdown';
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Link, RouteComponentProps } from 'react-router-dom';
import DefaultLayout from '../basics/DefaultLayout';
import { useUserId } from '../models/Users';

const HomePage: React.FC<RouteComponentProps> = (props) => {
  const [message, setMessage] = useState('');
  const [userId /*, userIdReady, userIdError */] = useUserId(firebase.auth());

  useEffect(() => {
    const firestore = firebase.firestore();
    const doc = firestore.collection('items').doc('S3GcZi61hk8XrzGjvkch');
    return doc.onSnapshot({
      next(ss) {
        const data = ss.data() || {};
        setMessage(data.message);
      },
    });
  }, []);

  const uiConfig: firebaseui.auth.Config = {
    credentialHelper: firebaseui.auth.CredentialHelper.NONE, // disable AccountChooser.com
    signInOptions: [
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  };

  const onUpdateClick = async () => {
    const newMessage = window.prompt('New message?', message);
    if (!newMessage) {
      return;
    }

    const firestore = firebase.firestore();
    const doc = firestore.collection('items').doc('S3GcZi61hk8XrzGjvkch');
    const data = { message: newMessage };
    await doc.set(data);
  };

  const onLogOutClick = async () => {
    await firebase.auth().signOut();
  };

  return (
    <DefaultLayout className="HomePage">
      <h1>Home</h1>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/notes">Note list</Link>
        </li>
      </ul>
      <p>
        {'Message: '}
        {message}
      </p>
      <button onClick={onUpdateClick}>Update</button>
      <p>
        {'User ID: '}
        {userId}
      </p>
      {userId ? (
        <p>
          <button onClick={onLogOutClick}>Log out</button>
        </p>
      ) : (
        <StyledFirebaseAuth
          firebaseAuth={firebase.auth()}
          uiConfig={uiConfig}
        />
      )}
      <NiceMarkdown content={`
# Hello Markdown World!

## Usage

1. Import

\`\`\`js
import NiceMarkdown from '@ginpei/react-nice-markdown';
\`\`\`

2. Invoke as a component

\`\`\`js
<NiceMarkdown content={\`# Hello Markdown World!\`} />
\`\`\`
`} />
    </DefaultLayout>
  );
};

export default HomePage;
