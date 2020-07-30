import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { StoreState } from '../reducers';
import { readDocuments, CourseDetails } from '../actions';
import { Spinner } from './Spinner';

interface HomeProps {
  readDocuments: Function;
  courses: CourseDetails[];
  loadingDocs: boolean;
  loadingDocsError: string | null;
}

function _Home(props: HomeProps): JSX.Element {
  React.useEffect(() => {
    props.readDocuments();
  }, []);

  const renderCourses = (): JSX.Element[] => {
    return props.courses.map((course) => {
      return (
        <div className="grid-33" key={course.id}>
          <Link className="course--module course--link" to="/course-detail">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{course.title}</h3>
          </Link>
        </div>
      );
    });
  };

  return (
    <div className="bounds">
      {props.loadingDocs ? (
        <div style={{ textAlign: 'center', marginTop: '10rem' }}>
          <Spinner visible={props.loadingDocs} />
        </div>
      ) : (
        <React.Fragment>
          {renderCourses()}
          <div className="grid-33">
            <Link
              className="course--module course--add--module"
              to="/create-course"
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
        </React.Fragment>
      )}
      {props.loadingDocsError}
    </div>
  );
}

const mapStateToProps = (
  state: StoreState
): {
  courses: CourseDetails[];
  loadingDocs: boolean;
  loadingDocsError: string | null;
} => ({
  courses: state.course.courses,
  loadingDocs: state.course.loadingDocs,
  loadingDocsError: state.course.loadingDocsError,
});

export const Home = connect(mapStateToProps, { readDocuments })(_Home);
