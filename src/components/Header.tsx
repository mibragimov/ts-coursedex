import React from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <>
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          <nav>
            <Link className="signup" to="/sign-up">
              Sign Up
            </Link>
            <Link className="signin" to="/sign-in">
              Sign In
            </Link>
          </nav>
        </div>
      </div>
      <hr />
    </>
  );
}
