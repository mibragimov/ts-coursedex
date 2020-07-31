import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { CourseDetails, readDocument, deleteDocument } from '../../actions';
import { StoreState } from '../../reducers';
import { Spinner } from '../Spinner';
import { Modal } from '../Modal';
import { auth } from '../../firebase/firebase.utils';

interface CourseDetailProps extends RouteComponentProps<MatchParams> {
  course: CourseDetails;
  readDocument: Function;
  deleteDocument: Function;
  loadingSelectedCourse: boolean;
  deleting: boolean;
  deleteError: string | null;
}

interface MatchParams {
  id: string;
}

const _CourseDetail = ({
  course,
  loadingSelectedCourse,
  readDocument,
  match,
  deleteDocument,
  history,
  deleting,
  deleteError,
}: CourseDetailProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const currentUser = auth.currentUser;

  const readDocumentCallback = React.useCallback(() => {
    readDocument(match.params.id);
  }, []);

  React.useEffect(() => {
    readDocumentCallback();
  }, []);

  const handleDeleteCourse = async (): Promise<void> => {
    await deleteDocument(match.params.id);
    history.push('/');
  };

  const renderActionButtons = (): JSX.Element | undefined => {
    if (currentUser && currentUser.uid === course.owner) {
      return (
        <span>
          <Link className="button" to="/update-course">
            Update Course
          </Link>
          <button className="button" onClick={() => setIsModalOpen(true)}>
            Delete Course
          </button>
        </span>
      );
    }

    return;
  };

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
        <React.Fragment>
          {deleteError}
          <div>
            <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100">
                  {renderActionButtons()}
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
          <Modal
            isOpen={isModalOpen}
            setModal={setIsModalOpen}
            onDelete={handleDeleteCourse}
            deleting={deleting}
          />
        </React.Fragment>
      );
    }
  };

  return renderContent();
};

const mapStateToProps = (
  state: StoreState
): {
  course: any;
  loadingSelectedCourse: boolean;
  deleting: boolean;
  deleteError: string | null;
} => {
  return {
    course: state.course.selectedCourse,
    loadingSelectedCourse: state.course.loadingSelectedCourse,
    deleting: state.course.deleting,
    deleteError: state.course.deleteError,
  };
};

export const CourseDetail = connect(mapStateToProps, {
  readDocument,
  deleteDocument,
})(_CourseDetail);
