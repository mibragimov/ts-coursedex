import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase/firebase.utils';
import { User } from '../actions';

interface HeaderProps {
  currentUser: User;
}

export const Header = (props: HeaderProps): JSX.Element => {
  const history = useHistory();
  const handleSignOut = async (): Promise<void> => {
    await auth.signOut();
    localStorage.removeItem('_user');
    history.push('/sign-in');
  };

  return (
    <>
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Coursedex</h1>
          <nav>
            {props.currentUser ? (
              <span>Welcome {props.currentUser.displayName}</span>
            ) : (
              <Link className="signup" to="/sign-up">
                Sign Up
              </Link>
            )}

            {props.currentUser ? (
              <a href="#" className="signout" onClick={handleSignOut}>
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
