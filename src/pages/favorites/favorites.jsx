import React, {useEffect} from 'react';
import Header from '../../components/header/header';
import PropTypes from 'prop-types';
import {offerProps} from '../../components/prop-types/prop-types';
import FavoritesItems from '../../components/favorites-items/favorites-items';
import {CITIES} from '../../const';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';
import {fetchFavorites} from './../../store/api-actions';
import Spinner from '../../components/spinner/spinner';

const Favorites = ({
  offers,
  userName,
  isFavoritesLoaded,
  setFavorites
}) => {
  useEffect(() => {
    if (!isFavoritesLoaded) {
      setFavorites();
    }
  }, [isFavoritesLoaded]);

  if (!isFavoritesLoaded) {
    return (
      <Spinner />
    );
  }

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

const mapStateToProps = ({offers, isFavoritesLoaded}) => ({
  offers,
  isFavoritesLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  changeCity(city) {
    dispatch(ActionCreator.changeCity(city));
  },
  setFavorites() {
    dispatch(fetchFavorites());
  }
});

Favorites.propTypes = {
  offers: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape(offerProps)), PropTypes.array]).isRequired,
  userName: PropTypes.string,
  isFavoritesLoaded: PropTypes.bool.isRequired,
  setFavorites: PropTypes.func.isRequired
};

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
