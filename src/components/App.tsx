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

export class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
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
