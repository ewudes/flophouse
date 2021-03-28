import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setErrorMessage} from '../../store/action';

const SHOW_TIME = 5000;

const ErrorMessage = () => {
  const {errorMessage} = useSelector((state) => state.USER);
  const dispatch = useDispatch();

  if (errorMessage.length) {
    setTimeout(() => {
      dispatch(setErrorMessage(``));
    }, SHOW_TIME);
  }
  return (
    <div style={{display: !errorMessage.length && `none`}}>
      <div>Error {errorMessage} try later</div>
    </div>
  );
};

export default ErrorMessage;
