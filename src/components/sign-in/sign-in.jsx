import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {AuthorizationStatus, AppRoute} from '../../const';

const SignIn = ({authorizationStatus, userName, avatarUrl}) => {
  return authorizationStatus === AuthorizationStatus.AUTH ?
    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.FAVORITES}>
      <div className="header__avatar-wrapper user__avatar-wrapper" style={{backgroundImage: `url(${avatarUrl})`}}>
      </div>
      <span className="header__user-name user__name">{userName}</span>
    </Link> :
    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.LOGIN}>
      <div className="header__avatar-wrapper user__avatar-wrapper">
      </div>
      <span className="header__user-name user__name">Sign in</span>
    </Link>;

};

const mapStateToProps = ({authorizationStatus, userName, avatarUrl}) => ({
  authorizationStatus,
  userName,
  avatarUrl
});

SignIn.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  userName: PropTypes.string,
  avatarUrl: PropTypes.string.isRequired,
};

export {SignIn};
export default connect(mapStateToProps, null)(SignIn);
