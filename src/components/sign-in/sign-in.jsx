import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {AuthorizationStatus, AppRoute} from '../../const';
import {getAuthorizationStatus, getUserName, getAvatarUrl} from '../../store/selectors';

const SignIn = () => {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const userName = useSelector(getUserName);
  const avatarUrl = useSelector(getAvatarUrl);

  return authorizationStatus === AuthorizationStatus.AUTH ?
    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.FAVORITES}>
      <div className="header__avatar-wrapper user__avatar-wrapper" style={{backgroundImage: `url(${avatarUrl})`, borderRadius: `50%`}}>
      </div>
      <span className="header__user-name user__name">{userName}</span>
    </Link> :
    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.LOGIN}>
      <div className="header__avatar-wrapper user__avatar-wrapper">
      </div>
      <span className="header__user-name user__name">Sign in</span>
    </Link>;

};
export default SignIn;
