import React from 'react';
import ReactModal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import { Emoji } from './Emoji';
import withStyles, { WithStylesProps } from 'react-jss';

const styles = {
  closeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    cursor: 'pointer',
    fontSize: '1.3rem',

    '&:hover': {
      color: 'red',
    },
  },
  box: {
    marginTop: '2rem',
    textAlign: 'center',
  },
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgRasberry: {
    backgroundColor: '#d21f3c',

    '&:hover': {
      backgroundColor: 'rgba(210, 31, 61, 0.746) !important',
    },
  },
};

interface ModalProps extends WithStylesProps<typeof styles> {
  isOpen: boolean;
  setModal(active: boolean): void;
  onDelete: Function;
  deleting: boolean;
}

const _Modal = ({
  isOpen,
  setModal,
  classes,
  onDelete,
  deleting,
}: ModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      style={{
        content: {
          maxWidth: '400px',
          height: '200px',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '5px',
        },
      }}
    >
      <div>
        <span onClick={() => setModal(false)} className={classes.closeIcon}>
          <AiOutlineClose />
        </span>
        <div className={classes.box}>
          <p>Are you sure you want to delete this course?</p>
          <div className={classes.flex}>
            <button
              className="button"
              onClick={() => onDelete()}
              disabled={deleting}
            >
              {deleting ? (
                <Emoji label="Deleting" symbol="⏳" />
              ) : (
                <Emoji label="Yes" symbol="👌" />
              )}
            </button>
            <button
              className={`button ${classes.bgRasberry}`}
              onClick={() => setModal(false)}
              disabled={deleting}
            >
              <Emoji label="No" symbol="🙅" />
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export const Modal = withStyles(styles)(_Modal);
