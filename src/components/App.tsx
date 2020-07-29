import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Home } from './Home';
import { Signup } from './Signup';
import { Signin } from './Signin';
import { Header } from './Header';
import { CreateCourse } from './course/CreateCourse';
import { UpdateCourse } from './course/UpdateCourse';
import { CourseDetail } from './course/CourseDetail';
import { NotFound } from './NotFound';
import { auth, createUserProfileDocument } from '../firebase/firebase.utils';
import { setCurrentUser, User } from '../actions';
import { StoreState } from '../reducers';

interface AppProps {
  currentUser: User;
  setCurrentUser: typeof setCurrentUser;
}

class _App extends React.Component<AppProps> {
  unsubscribeFromAuth: any;

  constructor(props: AppProps) {
    super(props);

    this.unsubscribeFromAuth = null;
  }

  componentDidMount(): void {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await createUserProfileDocument(user);

        userRef?.onSnapshot((snapshot) => {
          const data = snapshot.data();
          this.props.setCurrentUser({
            id: snapshot.id,
            displayName: data?.displayName,
            email: data?.email,
          });
        });
      }
      this.props.setCurrentUser(null);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    console.log(this.props.currentUser);

    return (
      <div>
        <Header currentUser={this.props.currentUser} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/sign-in" component={Signin} />
          <Route path="/sign-up" component={Signup} />
          <Route path="/create-course" component={CreateCourse} />
          <Route path="/update-course" component={UpdateCourse} />
          <Route path="/course-detail" component={CourseDetail} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState): { currentUser: User } => ({
  currentUser: state.user,
});

export const App = connect(mapStateToProps, { setCurrentUser })(_App);
