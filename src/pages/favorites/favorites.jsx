import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import Header from '../../components/header/header';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import FavoritesItems from '../../components/favorites-items/favorites-items';
import {CITIES, AppRoute} from '../../const';
import {useDispatch, useSelector} from 'react-redux';
import {fetchFavorites} from './../../store/api-actions';
import Spinner from '../../components/spinner/spinner';
import ErrorMessage from '../../components/error-message/error-message';
import {getFavorites, checkFavoritesLoaded} from '../../store/selectors';
import './favorites.css';

const Favorites = () => {
  const favorites = useSelector(getFavorites);
  const isFavoritesLoaded = useSelector(checkFavoritesLoaded);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isFavoritesLoaded) {
      dispatch(fetchFavorites());
    }
  }, [isFavoritesLoaded]);

  if (!isFavoritesLoaded) {
    return (
      <Spinner />
    );
  }

  return favorites.length ?
    <div className="page page--favorites">
      <ErrorMessage/>
      <Header/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {CITIES.map((city, index) => {
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
    </div> :
    <FavoritesEmpty />;
};

export default Favorites;
