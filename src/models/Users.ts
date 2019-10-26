import { useState, useEffect } from 'react';

export function useUserId(
  auth: firebase.auth.Auth,
): [string, boolean, Error | firebase.auth.Error | null] {
  const [userId, setUserId] = useState('');
  const [userError, setUserError] = useState<Error | firebase.auth.Error | null>(null);
  const [userReady, setUserReady] = useState(false);

  useEffect(() => {
    return auth.onAuthStateChanged(
      (user) => {
        setUserId(user ? user.uid : '');
        setUserReady(true);
      },
      (error) => {
        setUserError(error);
        setUserReady(true);
      },
    );
  }, [auth]);

  return [userId, userReady, userError];
}
