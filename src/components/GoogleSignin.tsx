import React from 'react';
import { signInWithGoogle } from '../firebase/firebase.utils';

export function GoogleSignin() {
  return (
    <div>
      <button className="button" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
}
