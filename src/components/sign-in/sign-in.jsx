import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {AuthorizationStatus, Routes} from '../../const';

const SignIn = ({authorizationStatus, userName = ``}) => {
  return authorizationStatus === AuthorizationStatus.AUTH ?
    <Link className="header__nav-link header__nav-link--profile" to={Routes.FAVOR}>
      <div className="header__avatar-wrapper user__avatar-wrapper">
      </div>
      <span className="header__user-name user__name">{userName}</span>
    </Link> :
    <Link className="header__nav-link header__nav-link--profile" to={Routes.LOGIN}>
      <div className="header__avatar-wrapper user__avatar-wrapper">
      </div>
      <span className="header__user-name user__name">Sign in</span>
    </Link>;

};

SignIn.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired
};

const mapStateToProps = ({authorizationStatus}) => ({
  authorizationStatus
});

export {SignIn};
export default connect(mapStateToProps, null)(SignIn);
