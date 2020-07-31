import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { History } from 'history';
import { auth, createUserProfileDocument } from '../firebase/firebase.utils';
import { Emoji } from './Emoji';

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
}

const errorStyle = {
  color: 'red',
  marginBottom: '10px',
};

const span = {
  display: 'block',
};

export const Signup = (props: SignupProps): JSX.Element => {
  const { register, handleSubmit, errors, watch } = useForm<Inputs>();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [disabled, setDisabled] = React.useState(false);
  const watchFields = watch(['password', 'confirmPassword']);

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onSubmit = async (data: Inputs): Promise<void> => {
    const { password, confirmPassword } = watchFields;
    if (password !== confirmPassword) {
      setErrorMessage('Password does not match');
      return;
    }
    try {
      setDisabled(true);
      const { user } = await auth.createUserWithEmailAndPassword(
        data.emailAddress,
        data.password
      );
      await createUserProfileDocument(user, {
        displayName: `${data.firstName} ${data.lastName}`,
      });

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
                onChange={() => setErrorMessage('')}
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
                onChange={() => setErrorMessage('')}
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
              <button className="button" type="submit" disabled={disabled}>
                <Emoji symbol="🚀" label="Sign Up" />
              </button>
              <button
                type="button"
                className="button button-secondary"
                onClick={() => props.history.push('/')}
                disabled={disabled}
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
