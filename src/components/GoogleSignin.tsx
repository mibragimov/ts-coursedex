import React from 'react';
import { connect } from 'react-redux';
import { googleSigninStart } from '../actions';

interface _GoogleSigninProps {
  googleSigninStart: Function;
}

function _GoogleSignin({ googleSigninStart }: _GoogleSigninProps) {
  return (
    <div>
      <button
        className="button"
        onClick={() => googleSigninStart()}
        type="button"
      >
        Sign in with Google
      </button>
    </div>
  );
}

export const GoogleSignin = connect(null, { googleSigninStart })(_GoogleSignin);
