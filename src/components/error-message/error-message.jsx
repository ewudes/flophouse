import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {setErrorMessage} from '../../store/action';

const SHOW_TIME = 5000;

const ErrorMessage = ({errorMessage, removeErrorMessage}) => {
  if (errorMessage.length) {
    setTimeout(() => {
      removeErrorMessage(``);
    }, SHOW_TIME);
  }
  return (
    <div style={{display: !errorMessage.length && `none`}}>
      <div>Error {errorMessage} try later</div>
    </div>
  );
};
ErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  removeErrorMessage: PropTypes.func.isRequired
};
const mapStateToProps = ({errorMessage}) => ({
  errorMessage
});

const mapDispatchToProps = (dispatch) => ({
  removeErrorMessage(message) {
    dispatch(setErrorMessage(message));
  }
});

export {ErrorMessage};
export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage);
