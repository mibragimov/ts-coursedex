import React from 'react';
import _ from 'lodash';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { StoreState } from '../../reducers';
import { CourseDetails, updateDocument } from '../../actions';
import { Emoji } from '../Emoji';

interface UpdateCourseProps extends RouteComponentProps<MatchParams> {
  course: CourseDetails;
  updateDocument: Function;
  updating: boolean;
  updateError: string | null;
}

interface MatchParams {
  id: string;
}

type Inputs = {
  title: string;
  description: string;
  estimatedTime: string;
  materialsNeeded: string;
};

const _UpdateCourse = ({
  history,
  match,
  updateDocument,
  updating,
  updateError,
}: UpdateCourseProps): JSX.Element => {
  const { register, handleSubmit, errors } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    await updateDocument(match.params.id, { ...data, id: match.params.id });
    history.push('/');
  };

  /* retreive selected course from localstorage, non null assertion ! */
  const _course = JSON.parse(localStorage.getItem('_course')!);

  const initialFormValues = {
    title: _course.title,
    description: _course.description,
    displayName: _course.displayName,
    estimatedTime: _course.estimatedTime,
    materialsNeeded: _course.materialsNeeded,
  };

  const validateFormFields = () => {
    if (!_.isEmpty(errors)) {
      return (
        <div>
          <h2 className="validation--errors--label">Validation errors</h2>
          <div className="validation-errors">
            <ul>
              {errors.title && <li>Please provide a value for "Title"</li>}
              {errors.description && <li>{errors.description.message}</li>}
              {errors.estimatedTime && <li>{errors.estimatedTime.message}</li>}
              {errors.materialsNeeded && (
                <li>Please provide a value for "Materials Needed"</li>
              )}
              {updateError ? <li>{updateError}</li> : null}
            </ul>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="bounds course--detail">
      <h1>Update Course</h1>
      <div>
        {validateFormFields()}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <div>
                <input
                  id="title"
                  name="title"
                  defaultValue={initialFormValues.title}
                  ref={register({ required: true })}
                  type="text"
                  className="input-title course--title--input"
                  placeholder="Course title..."
                />
              </div>
              <p>By {_course.displayName}</p>
            </div>
            <div className="course--description">
              <div>
                <textarea
                  id="description"
                  name="description"
                  defaultValue={initialFormValues.description}
                  ref={register({
                    required: 'Please provide a value for "Description"',
                    minLength: {
                      value: 50,
                      message:
                        'Description should be at least more than 50 characters',
                    },
                  })}
                  className=""
                  placeholder="Course description..."
                ></textarea>
              </div>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <div>
                    <input
                      id="estimatedTime"
                      name="estimatedTime"
                      defaultValue={initialFormValues.estimatedTime}
                      ref={register}
                      type="text"
                      className="course--time--input"
                      placeholder="Hours"
                    />
                  </div>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <div>
                    <textarea
                      id="materialsNeeded"
                      name="materialsNeeded"
                      defaultValue={initialFormValues.materialsNeeded}
                      ref={register}
                      className=""
                      placeholder="List materials..."
                    ></textarea>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid-100 pad-bottom">
            <button className="button" type="submit" disabled={updating}>
              {updating ? (
                <Emoji label="Updating" symbol="⌛" />
              ) : (
                <Emoji label="Update" symbol="🚀" />
              )}
            </button>
            <button
              className="button button-secondary"
              onClick={() => history.goBack()}
              disabled={updating}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (
  state: StoreState
): { updating: boolean; updateError: string | null } => ({
  updating: state.course.updating,
  updateError: state.course.updateError,
});

export const UpdateCourse = connect(mapStateToProps, { updateDocument })(
  _UpdateCourse
);
