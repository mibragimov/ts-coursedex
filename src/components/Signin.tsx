import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { History } from 'history';
import { useForm } from 'react-hook-form';
import { Emoji } from './Emoji';
import { GoogleSignin } from './GoogleSignin';
import { signinWithEmailStart } from '../actions';

interface SigninProps {
  history: History;
  signinWithEmailStart: Function;
}
type Inputs = {
  emailAddress: string;
  password: string;
};
const errorStyle = {
  color: 'red',
  marginBottom: '10px',
};

const span = {
  display: 'block',
};

const _Signin = (props: SigninProps): JSX.Element => {
  const { register, handleSubmit, errors } = useForm<Inputs>();
  const [disabled, setDisabled] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState('');

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onSubmit = async (data: Inputs) => {
    try {
      setDisabled(true);
      await props.signinWithEmailStart({
        email: data.emailAddress,
        password: data.password,
      });

      setErrorMessage('');
      props.history.push('/');
    } catch (error) {
      setDisabled(false);
      setErrorMessage(error.message);
    }
  };

  const renderValidationErrors = () => {
    if (!_.isEmpty(errors) || errorMessage) {
      return (
        <div style={errorStyle}>
          <span style={span}>
            {errors.emailAddress && errors.emailAddress.message}
          </span>
          <span style={span}>{errors.password && errors.password.message}</span>
          <span style={span}>{errorMessage && errorMessage}</span>
        </div>
      );
    }
  };

  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign In</h1>
        <div>
          {renderValidationErrors()}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                id="emailAddress"
                name="emailAddress"
                type="text"
                className=""
                placeholder="Email Address"
                ref={register({
                  required: 'Email is required',
                  pattern: {
                    value: emailRegex,
                    message: 'Please provide a valid email',
                  },
                })}
                onChange={() => setErrorMessage('')}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                className=""
                placeholder="Password"
                ref={register({ required: 'Password is required' })}
                onChange={() => setErrorMessage('')}
              />
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit" disabled={disabled}>
                <Emoji label="Sign In" symbol="🚀" />
              </button>
              <button
                className="button button-secondary"
                type="button"
                onClick={() => props.history.push('/')}
                disabled={disabled}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <p>&nbsp;</p>
        <GoogleSignin />
        <p>&nbsp;</p>
        <p>
          Don't have a user account? <Link to="/sign-up">Click here</Link> to
          sign up!
        </p>
      </div>
    </div>
  );
};

export const Signin = connect(null, { signinWithEmailStart })(_Signin);
