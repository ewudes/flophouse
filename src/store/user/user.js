import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus, AVATAR} from '../../const';
import {
  changeUserAvatar,
  changeUserName,
  requiredAuthorization,
  setErrorMessage
} from '../action';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  userName: ``,
  avatarUrl: AVATAR,
  errorMessage: ``,
};

const user = createReducer(initialState, (builder) => {
  builder.addCase(requiredAuthorization, (state, action) => {
    state.authorizationStatus = action.payload;
  });

  builder.addCase(changeUserName, (state, action) => {
    state.userName = action.payload;
  });

  builder.addCase(changeUserAvatar, (state, action) => {
    state.avatarUrl = action.payload;
  });

  builder.addCase(setErrorMessage, (state, action) => {
    state.errorMessage = String(action.payload);
  });
});

export {user};
