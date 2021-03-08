import React from 'react';
import Header from '../../components/header/header';
import {Link} from 'react-router-dom';
import {CITIES} from '../../const';

const NotFound = () => {

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">

              {CITIES.map((city, index) => {
                return (
                  <li className="locations__item" key={index}>
                    <a className="locations__item-link tabs__item" href={`${city}`}>
                      <span>{city}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">404 Not Found</b>
                <Link className="form__submit button" to="/">Go back to the main page</Link>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
