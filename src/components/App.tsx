import React, { lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home } from './Home';
import { Header } from './Header';
import { Signin } from './Signin';
import { Signup } from './Signup';
import { NotFound } from './NotFound';
import { auth, createUserProfileDocument } from '../firebase/firebase.utils';
import { setCurrentUser, User } from '../actions';
import { StoreState } from '../reducers';
import { Forbidden } from './Forbidden';
import { Spinner } from './Spinner';
import { ErrorBoundary } from './ErrorBoundary';

// dynamic imports for code splitting with react lazy
// TODO: refactor

const CourseDetail = lazy(() =>
  import('./course/CourseDetail').then(({ CourseDetail }) => ({
    default: CourseDetail,
  }))
);
const CreateCourse = lazy(() =>
  import('./course/CreateCourse').then(({ CreateCourse }) => ({
    default: CreateCourse,
  }))
);
const UpdateCourse = lazy(() =>
  import('./course/UpdateCourse').then(({ UpdateCourse }) => ({
    default: UpdateCourse,
  }))
);

interface AppProps {
  currentUser: User;
  setCurrentUser: typeof setCurrentUser;
  isAuthenticated: boolean;
}
// TODO: convert class to functional component
// TODO: use sagas for subscribing to auth state change
class _App extends React.Component<AppProps> {
  // bad way! avoid assigning 'any' type
  // TODO: remove unsubscribe method, create actions for auth methods
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

  componentWillUnmount(): void {
    this.unsubscribeFromAuth();
  }

  render() {
    let routes: JSX.Element;

    routes = (
      <ErrorBoundary>
        <Suspense fallback={<Spinner visible={true} />}>
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <Home {...props} isAuth={this.props.isAuthenticated} />
              )}
            />
            <Route path="/course-detail/:id" component={CourseDetail} />
            <Route path="/sign-in" component={Signin} />
            <Route path="/sign-up" component={Signup} />
            <Route component={Forbidden} />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <ErrorBoundary>
          <Suspense fallback={<Spinner visible={true} />}>
            <Switch>
              <Redirect from="/sign-in" to="/" />
              <Redirect from="/sign-up" to="/" />
              <Route
                path="/"
                exact
                render={(props) => (
                  <Home {...props} isAuth={this.props.isAuthenticated} />
                )}
              />
              <Route path="/create-course" component={CreateCourse} />
              <Route path="/update-course/:id" component={UpdateCourse} />
              <Route path="/course-detail/:id" component={CourseDetail} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </ErrorBoundary>
      );
    }
    return (
      <div>
        <Header currentUser={this.props.currentUser} />
        {routes}
      </div>
    );
  }
}

const mapStateToProps = (
  state: StoreState
): { currentUser: User; isAuthenticated: boolean } => ({
  currentUser: state.user,
  isAuthenticated: state.user !== null,
});

export const App = connect(mapStateToProps, { setCurrentUser })(_App);
