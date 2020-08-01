import React, { lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home } from './Home';
import { Header } from './Header';
import { Signin } from './Signin';
import { Signup } from './Signup';
import { NotFound } from './NotFound';
import { StoreState, selectCurrentUser } from '../reducers';
import { Forbidden } from './Forbidden';
import { Spinner } from './Spinner';
import { ErrorBoundary } from './ErrorBoundary';
import { checkUserSession, CurrentUser } from '../actions';

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
  currentUser: CurrentUser | null;
  isAuthenticated: boolean;
  checkUserSession: Function;
}

const _App = ({ isAuthenticated, currentUser, checkUserSession }: AppProps) => {
  React.useEffect(() => {
    checkUserSession();
  }, []);

  let routes: JSX.Element;

  routes = (
    <ErrorBoundary>
      <Suspense fallback={<Spinner visible={true} />}>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => <Home {...props} isAuth={isAuthenticated} />}
          />
          <Route path="/course-detail/:id" component={CourseDetail} />
          <Route path="/sign-in" component={Signin} />
          <Route path="/sign-up" component={Signup} />
          <Route component={Forbidden} />
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );

  if (isAuthenticated) {
    routes = (
      <ErrorBoundary>
        <Suspense fallback={<Spinner visible={true} />}>
          <Switch>
            <Redirect from="/sign-in" to="/" />
            <Redirect from="/sign-up" to="/" />
            <Route
              path="/"
              exact
              render={(props) => <Home {...props} isAuth={isAuthenticated} />}
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
      <Header currentUser={currentUser} />
      {routes}
    </div>
  );
};

const mapStateToProps = (
  state: StoreState
): { isAuthenticated: boolean; currentUser: CurrentUser | null } => {
  return {
    isAuthenticated: state.user.currentUser !== null,
    currentUser: selectCurrentUser(state),
  };
};

export const App = connect(mapStateToProps, {
  checkUserSession,
})(_App);
