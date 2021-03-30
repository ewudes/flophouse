import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import SignIn from '../sign-in/sign-in';
import {logout} from '../../store/api-actions';
import {AppRoute} from '../../const';
import {isAuthorized} from '../../utils';
import {getAuthorizationStatus} from '../../store/selectors';

const Header = () => {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.MAIN}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li
                className="header__nav-item user"
                style={{
                  display: `flex`,
                }}
              >
                <SignIn />
                {
                  isAuthorized(authorizationStatus) &&
                    <button
                      className="button"
                      onClick={handleLogoutClick}
                      style={{
                        backgroundImage: `url(../img/icon-logout.svg)`,
                        backgroundRepeat: `no-repeat`,
                        backgroundPosition: `center`,
                        fontSize: `0`,
                        width: `45px`,
                        height: `20px`
                      }}
                    >
                      Logout
                    </button>
                }
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
