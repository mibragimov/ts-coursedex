import React from 'react';
import { Link } from 'react-router-dom';
import { History } from 'history';
import { auth } from '../firebase/firebase.utils';

interface SigninProps {
  history: History;
}

export const Signin = (props: SigninProps): JSX.Element => {
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(emailAddress, password);
      props.history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign In</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                id="emailAddress"
                name="emailAddress"
                type="text"
                className=""
                placeholder="Email Address"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                className=""
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">
                Sign In
              </button>
              <button className="button button-secondary">Cancel</button>
            </div>
          </form>
        </div>
        <p>&nbsp;</p>
        <p>
          Don't have a user account? <Link to="/sign-up">Click here</Link> to
          sign up!
        </p>
      </div>
    </div>
  );
};
