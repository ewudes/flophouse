import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import SignIn from '../sign-in/sign-in';


const Header = ({userName = ``}) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <SignIn userName={userName} />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  userName: PropTypes.string.isRequired
};

export default Header;
