import React from 'react';
import Header from '../header/header';
import PropTypes from 'prop-types';
import Favorites from '../favorites/favorites';

const CITIES = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];

const FavoritesWrap = ({
  cards
}) => {
  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">

              {CITIES.map((city, index) => {
                const filtered = cards.filter((card) => card.city.name === city && card.isFavorite);
                return filtered.length < 1 ? `` : <Favorites city={city} cards={filtered} key={index} />;
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

FavoritesWrap.propTypes = {
  cards: PropTypes.array.isRequired
};

export default FavoritesWrap;
