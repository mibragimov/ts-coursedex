import React from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { signoutStart, CurrentUser } from '../actions';

interface HeaderProps {
  currentUser: CurrentUser | null;
  signoutStart: Function;
}

const _Header = (props: HeaderProps): JSX.Element => {
  const history = useHistory();
  const handleSignOut = (): void => {
    props.signoutStart(history);
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

export const Header = connect(null, { signoutStart })(_Header);
