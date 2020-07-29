import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebase.utils';

interface HeaderProps {
  currentUser: {
    id: string;
  } | null;
}

export const Header = (props: HeaderProps): JSX.Element => {
  return (
    <>
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          <nav>
            {props.currentUser ? (
              <span>`Welcome ${props.currentUser.id}`</span>
            ) : (
              <Link className="signup" to="/sign-up">
                Sign Up
              </Link>
            )}

            {props.currentUser ? (
              <a href="#" className="signout" onClick={() => auth.signOut()}>
                Signout
              </a>
            ) : (
              <Link className="signin" to="/sign-in">
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </div>
      <hr />
    </>
  );
};
