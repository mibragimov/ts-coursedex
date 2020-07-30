import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { CourseDetails, readDocument } from '../../actions';
import { StoreState } from '../../reducers';
import { Spinner } from '../Spinner';

interface CourseDetailProps extends RouteComponentProps<MatchParams> {
  course: CourseDetails;
  readDocument: Function;
  loadingSelectedCourse: boolean;
}

interface MatchParams {
  id: string;
}

const _CourseDetail = ({
  course,
  loadingSelectedCourse,
  readDocument,
  match,
}: CourseDetailProps): JSX.Element => {
  const readDocumentCallback = React.useCallback(() => {
    readDocument(match.params.id);
  }, []);

  React.useEffect(() => {
    readDocumentCallback();
  }, []);

  const renderMaterials = () => {
    if (course.materialsNeeded && course.materialsNeeded.includes(',')) {
      let materials = course.materialsNeeded.split(',');
      return materials.map((material, idx) => {
        return <li key={idx}>{material}</li>;
      });
    } else if (course.materialsNeeded) {
      return <li>{course.materialsNeeded}</li>;
    }
  };

  const renderContent = (): JSX.Element => {
    if (loadingSelectedCourse) {
      return (
        <div style={{ textAlign: 'center', marginTop: '10rem' }}>
          <Spinner visible={loadingSelectedCourse} />
        </div>
      );
    } else {
      return (
        <div>
          <div className="actions--bar">
            <div className="bounds">
              <div className="grid-100">
                <span>
                  <Link className="button" to="/update-course">
                    Update Course
                  </Link>
                  <a className="button" href="#">
                    Delete Course
                  </a>
                </span>
                <Link className="button button-secondary" to="/">
                  Return to List
                </Link>
              </div>
            </div>
          </div>
          <div className="bounds course--detail">
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
                <p>By {course.displayName}</p>
              </div>
              <div className="course--description">
                <p>{course.description}</p>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <h3>{course.estimatedTime}</h3>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <ul>{renderMaterials()}</ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return renderContent();
};

const mapStateToProps = (
  state: StoreState
): { course: any; loadingSelectedCourse: boolean } => {
  return {
    course: state.course.selectedCourse,
    loadingSelectedCourse: state.course.loadingSelectedCourse,
  };
};

export const CourseDetail = connect(mapStateToProps, { readDocument })(
  _CourseDetail
);
