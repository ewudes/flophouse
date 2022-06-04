import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setErrorMessage} from '../../store/action';
import {getErrorMessage} from '../../store/selectors';
import './error-message.css';

const SHOW_TIME = 5000;

const ErrorMessage = () => {
  const errorMessage = useSelector(getErrorMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errorMessage.length) {
      setTimeout(() => {
        dispatch(setErrorMessage(``));
      }, SHOW_TIME);
    }
  });

  return (
    <div className="errorMesage" style={{display: !errorMessage.length && `none`}}>
      <div>Error {errorMessage} try later</div>
    </div>
  );
};

export default ErrorMessage;
