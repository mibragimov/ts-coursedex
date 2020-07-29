import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { History } from 'history';
import { auth, createUserProfileDocument } from '../firebase/firebase.utils';

interface SignupState {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
}

interface SignupProps {
  history: History;
}

export class Signup extends Component<SignupProps, SignupState> {
  constructor(props: SignupProps) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    } = this.state;

    if (password !== confirmPassword) {
      alert('Password does not match');
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        emailAddress,
        password
      );

      await createUserProfileDocument(user, {
        displayName: `${firstName} ${lastName}`,
      });

      this.props.history.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className=""
                  placeholder="First Name"
                  value={firstName}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className=""
                  placeholder="Last Name"
                  value={lastName}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  className=""
                  placeholder="Email Address"
                  value={emailAddress}
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className=""
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={this.handleChange}
                />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">
                  Sign Up
                </button>
                <button className="button button-secondary">Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>
            Already have a user account? <Link to="/sign-in">Click here</Link>{' '}
            to sign in!
          </p>
        </div>
      </div>
    );
  }
}
