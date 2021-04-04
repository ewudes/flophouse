import {AuthorizationStatus, AVATAR} from '../../const';
import {
  changeUserAvatar,
  changeUserName,
  requiredAuthorization,
  setErrorMessage
} from '../action';
import {user} from './user';

describe(`Reducers work correctly`, () => {
  it(`Reducer with no additional parameters should return initial state`, () => {
    expect(user(undefined, {}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userName: ``,
        avatarUrl: AVATAR,
        errorMessage: ``
      });
  });

  it(`Reducer should change user name`, () => {
    const state = {userName: ``, avatarUrl: AVATAR};

    expect(user(state, changeUserName(`Bob`)))
      .toEqual({
        userName: `Bob`,
        avatarUrl: AVATAR
      });
  });

  it(`Reducer should change authorization status`, () => {
    const state = {authorizationStatus: AuthorizationStatus.NO_AUTH};

    expect(user(state, requiredAuthorization(`AUTH`)))
      .toEqual({
        authorizationStatus: `AUTH`,
      });
  });

  it(`Reducer should change user avatar`, () => {
    const state = {userName: `Bob`, avatarUrl: AVATAR};

    expect(user(state, changeUserAvatar(`image/avatar.jpg`)))
      .toEqual({
        userName: `Bob`,
        avatarUrl: `image/avatar.jpg`,
      });
  });

  it(`Reducer should change error message type from number to string and then set the message`, () => {
    const state = {avatarUrl: AVATAR, errorMessage: ``};

    expect(user(state, setErrorMessage(404)))
      .toEqual({
        avatarUrl: AVATAR,
        errorMessage: `404`,
      });
  });
});
