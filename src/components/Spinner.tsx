import React from 'react';
import Loader from 'react-loader-spinner';

interface SpinnerProps {
  visible: boolean;
}

export const Spinner = (props: SpinnerProps): JSX.Element => {
  return (
    <Loader
      type="Plane"
      color="#00BFFF"
      height={150}
      width={150}
      visible={props.visible}
    />
  );
};