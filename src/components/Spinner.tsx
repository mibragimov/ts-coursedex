import React from 'react';
import Loader from 'react-loader-spinner';

interface SpinnerProps {
  visible: boolean;
}

export const Spinner = (props: SpinnerProps): JSX.Element => {
  return (
    <div style={{ textAlign: 'center', marginTop: '10rem' }}>
      <Loader
        type="Bars"
        color="#8458b3"
        height={100}
        width={100}
        visible={props.visible}
      />
    </div>
  );
};
