import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import Header from '../../components/header/header';
import PropTypes from 'prop-types';
import {offerProps} from '../../components/prop-types/prop-types';
import FavoritesItems from '../../components/favorites-items/favorites-items';
import {cities, AppRoute} from '../../const';
import {connect} from 'react-redux';
import {changeCity} from '../../store/action';
import {fetchFavorites} from './../../store/api-actions';
import Spinner from '../../components/spinner/spinner';
import ErrorMessage from '../../components/error-message/error-message';

const Favorites = ({
  favorites,
  isFavoritesLoaded,
  setFavorites,
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
      <ErrorMessage/>
      <Header/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">

              {cities.map((city, index) => {
                const filtered = favorites.filter((offer) => offer.city.name === city && offer.isFavorite);
                return filtered.length < 1 ? `` : <FavoritesItems city={city} offers={filtered} key={index} />;
              })}

            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.MAIN}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
};

const mapStateToProps = ({favorites, isFavoritesLoaded}) => ({
  favorites,
  isFavoritesLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  changeCity(city) {
    dispatch(changeCity(city));
  },
  setFavorites() {
    dispatch(fetchFavorites());
  }
});

Favorites.propTypes = {
  favorites: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape(offerProps)), PropTypes.array]).isRequired,
  isFavoritesLoaded: PropTypes.bool.isRequired,
  setFavorites: PropTypes.func.isRequired
};

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
