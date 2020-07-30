import React from 'react';
import _ from 'lodash';
import { History } from 'history';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setDocument } from '../../actions';
import { StoreState } from '../../reducers';
import { Emoji } from '../Emoji';

interface CreateCourseProps {
  setDocument: Function;
  creating: boolean;
  createError: string | null;
  currentUserName: string;
  history: History;
}

type Inputs = {
  title: string;
  description: string;
  estimatedTime: string;
  materialsNeeded: string;
};

const _CreateCourse = (props: CreateCourseProps): JSX.Element => {
  const { register, handleSubmit, errors } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    await props.setDocument(data);

    props.history.push('/');
  };

  const validate = () => {
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
              {props.createError ? <li>{props.createError}</li> : null}
            </ul>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="bounds course--detail">
      <h1>Create Course</h1>
      <div>
        {validate()}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <div>
                <input
                  id="title"
                  ref={register({ required: true })}
                  name="title"
                  type="text"
                  className="input-title course--title--input"
                  placeholder="Course title..."
                />
              </div>
              {props.currentUserName && <p>By {props.currentUserName}</p>}
            </div>
            <div className="course--description">
              <div>
                <textarea
                  id="description"
                  ref={register({
                    required: 'Please provide a value for "Description"',
                    minLength: {
                      value: 50,
                      message:
                        'Description should be at least more than 120 characters',
                    },
                  })}
                  name="description"
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
                      ref={register({
                        required: 'Please provide a value for "Estimated Time"',
                        maxLength: {
                          value: 8,
                          message:
                            'Estimated time maximum character limit is 8',
                        },
                      })}
                      name="estimatedTime"
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
                      ref={register({ required: true })}
                      name="materialsNeeded"
                      className=""
                      placeholder="List materials..."
                    ></textarea>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid-100 pad-bottom">
            <button className="button" type="submit">
              {props.creating ? (
                <Emoji symbol="⌛" label="Creating" />
              ) : (
                <Emoji symbol="🚀" label="Create" />
              )}
            </button>
            <button
              className="button button-secondary"
              onClick={() => props.history.goBack()}
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
): {
  creating: boolean;
  createError: string | null;
  currentUserName: string;
} => ({
  creating: state.course.creating,
  createError: state.course.createError,
  currentUserName: state.user.displayName,
});

export const CreateCourse = connect(mapStateToProps, { setDocument })(
  _CreateCourse
);
