import React from 'react';
import {cities} from '../../const';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';
import {PropTypes} from 'prop-types';

const Locations = ({changeCity, city}) => {
  const handleClickTabs = (currentCity) => {
    changeCity(currentCity);
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list" >
        {cities.map((item) => <li key={item} className="locations__item">
          <a className={`locations__item-link tabs__item ${item === city ? `tabs__item--active` : ``}`} href="#">
            <span onClick={() => handleClickTabs(item)}>{item}</span>
          </a>
        </li>)}
      </ul>
    </section>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeCity(city) {
    dispatch(ActionCreator.changeCity(city));
  }
});

const mapStateToProps = ({city}) => ({
  city
});

Locations.propTypes = {
  changeCity: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired
};

export {Locations};
export default connect(mapStateToProps, mapDispatchToProps)(Locations);
