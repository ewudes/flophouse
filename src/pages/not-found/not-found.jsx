import React from 'react';
import Header from '../../components/header/header';
import {Link} from 'react-router-dom';
import {CITIES} from '../../const';
import Locations from '../../components/locations/locations';

const NotFound = () => {

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Locations/>
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
