import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { History } from 'history';
import { StoreState, selectCourses } from '../reducers';
import { readDocsStart, CourseDetails } from '../actions';
import { Spinner } from './Spinner';

interface HomeProps {
  readDocsStart: Function;
  courses: CourseDetails[];
  loadingDocs: boolean;
  loadingDocsError: string | null;
  history: History;
  isAuth: boolean;
}

function _Home({
  readDocsStart,
  courses,
  loadingDocs,
  history,
  isAuth,
}: HomeProps): JSX.Element {
  React.useEffect(() => {
    if (!courses.length) {
      readDocsStart();
    }
  }, [readDocsStart, courses.length]);

  const renderCourses = (): JSX.Element[] => {
    return courses.map((course) => {
      return (
        <div
          className="grid-33"
          key={course.id}
          onClick={() => history.push(`/course-detail/${course.id}`)}
        >
          <Link className="course--module course--link" to="/course-detail">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{course.title}</h3>
          </Link>
        </div>
      );
    });
  };

  const renderCreateCourseButton = (): JSX.Element => {
    return (
      <div className="grid-33">
        <Link
          className="course--module course--add--module"
          to={isAuth ? '/create-course' : '/sign-in'}
        >
          <h3 className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </h3>
        </Link>
      </div>
    );
  };

  const renderContent = () => {
    if (loadingDocs) {
      return (
        <div className="bounds">
          <Spinner visible={loadingDocs} />
        </div>
      );
    } else {
      return (
        <div className="bounds">
          {renderCourses()}
          {renderCreateCourseButton()}
        </div>
      );
    }
  };

  return renderContent();
}

const mapStateToProps = (
  state: StoreState
): {
  courses: CourseDetails[];
  loadingDocs: boolean;
  loadingDocsError: string | null;
} => ({
  courses: selectCourses(state),
  loadingDocs: state.course.loadingDocs,
  loadingDocsError: state.course.loadingDocsError,
});

export const Home = connect(mapStateToProps, { readDocsStart })(_Home);
