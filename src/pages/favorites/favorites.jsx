import React from 'react';
import Header from '../../components/header/header';
import PropTypes from 'prop-types';
import FavoritesItems from '../../components/favorites-items/favorites-items';
import {CITIES} from '../../const';
import {offerProps} from '../../components/prop-types/prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';

const Favorites = ({
  offers,
  userName
}) => {
  return (
    <div className="page">
      <Header userName={userName}/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">

              {CITIES.map((city, index) => {
                const filtered = offers.filter((offer) => offer.city.name === city && offer.isFavorite);
                return filtered.length < 1 ? `` : <FavoritesItems city={city} offers={filtered} key={index} />;
              })}

            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
};

const mapStateToProps = ({offers}) => ({
  offers,
});

const mapDispatchToProps = (dispatch) => ({
  changeCity(city) {
    dispatch(ActionCreator.changeCity(city));
  }
});

Favorites.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerProps)).isRequired,
  userName: PropTypes.string.isRequired
};

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
