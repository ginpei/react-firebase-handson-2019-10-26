import React from 'react';
import DefaultLayout from '../basics/DefaultLayout';

type Props = {
  error: Error | firebase.auth.Error | firebase.firestore.FirestoreError;
}

const ErrorScreen: React.FC<Props> = ({ error }) => {
  return (
    <DefaultLayout className="ErrorScreen">
      <h1>Error</h1>
      <p>{error.message}</p>
    </DefaultLayout>
  );
}

export default ErrorScreen;
