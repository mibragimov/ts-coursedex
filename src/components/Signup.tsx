import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { History } from 'history';
import { Emoji } from './Emoji';
import { signupStart } from '../actions';
import { StoreState } from '../reducers';

type Inputs = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
  errorMessage: string;
};

interface SignupProps {
  history: History;
  signupStart: Function;
  loading: boolean;
  signupError: string | null;
}

const errorStyle = {
  color: 'red',
  marginBottom: '10px',
};

const span = {
  display: 'block',
};

const _Signup = ({
  signupStart,
  signupError,
  loading,
  history,
}: SignupProps): JSX.Element => {
  const { register, handleSubmit, errors, watch } = useForm<Inputs>();
  const [errorMessage, setErrorMessage] = React.useState('');

  const watchFields = watch(['password', 'confirmPassword']);

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onSubmit = async (data: Inputs): Promise<void> => {
    const { password, confirmPassword } = watchFields;
    if (password !== confirmPassword) {
      setErrorMessage('Password does not match');
      return;
    }

    signupStart(
      {
        email: data.emailAddress,
        password: data.password,
      },
      history,
      {
        displayName: `${data.firstName} ${data.lastName}`,
      }
    );
  };

  const renderValidationErrors = () => {
    if (!_.isEmpty(errors) || signupError || errorMessage) {
      return (
        <div style={errorStyle}>
          <span style={span}>
            {errors.firstName && errors.firstName.message}
          </span>
          <span style={span}>{errors.lastName && errors.lastName.message}</span>
          <span style={span}>
            {errors.emailAddress && errors.emailAddress.message}
          </span>
          <span style={span}>{errors.password && errors.password.message}</span>
          <span style={span}>
            {errors.confirmPassword && errors.confirmPassword.message}
          </span>
          <span style={span}>{signupError && signupError}</span>
          <span style={span}>{errorMessage && errorMessage}</span>
        </div>
      );
    }
  };

  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign Up</h1>
        <div>
          {renderValidationErrors()}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className=""
                placeholder="First Name"
                ref={register({ required: 'First name is required' })}
              />
            </div>
            <div>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className=""
                placeholder="Last Name"
                ref={register({ required: 'Last name is required' })}
              />
            </div>
            <div>
              <input
                id="emailAddress"
                name="emailAddress"
                type="email"
                className=""
                placeholder="Email Address"
                ref={register({
                  required: 'Email address is required',
                  pattern: {
                    value: emailRegex,
                    message: 'Please provide a valid email',
                  },
                })}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                className=""
                placeholder="Password"
                ref={register({
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password should be at least 6 characters',
                  },
                })}
                onChange={() => setErrorMessage('')}
              />
            </div>
            <div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className=""
                placeholder="Confirm Password"
                ref={register({
                  required: 'Confirm password is required',
                })}
                onChange={() => setErrorMessage('')}
              />
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit" disabled={loading}>
                <Emoji symbol="🚀" label="Sign Up" />
              </button>
              <button
                type="button"
                className="button button-secondary"
                onClick={() => history.push('/')}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <p>&nbsp;</p>
        <p>
          Already have a user account? <Link to="/sign-in">Click here</Link> to
          sign in!
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  loading: state.user.loading,
  signupError: state.user.error,
});

export const Signup = connect(mapStateToProps, { signupStart })(_Signup);
