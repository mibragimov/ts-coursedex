import React from 'react';
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

interface AppProps {}

interface AppState {
  currentUser: {
    displayName?: string;
    id: string;
    email?: string;
  } | null;
}

export class App extends React.Component<AppProps, AppState> {
  unsubscribeFromAuth: any;

  constructor(props: AppProps) {
    super(props);

    this.unsubscribeFromAuth = null;

    this.state = {
      currentUser: null,
    };
  }

  componentDidMount(): void {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await createUserProfileDocument(user);

        userRef?.onSnapshot((snapshot) => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          });
        });
      }
      this.setState({ currentUser: null });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
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
