import React from 'react';
import Header from '../../components/header/header';
import PropTypes from 'prop-types';
import FavoritesItems from '../../components/favorites-items/favorites-items';
import {offerProps} from '../../components/prop-types/prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';

const Favorites = ({
  offers
}) => {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const cityList = [...new Set(favoriteOffers.map((offer) => offer.city.name))];

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">

              {cityList.map((city, index) => {
                const filtered = offers.filter((card) => card.city.name === city && card.isFavorite);
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

Favorites.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerProps)).isRequired,
};

const mapStateToProps = ({offers}) => ({
  offers,
});

const mapDispatchToProps = (dispatch) => ({
  changeCity(city) {
    dispatch(ActionCreator.changeCity(city));
  }
});

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
