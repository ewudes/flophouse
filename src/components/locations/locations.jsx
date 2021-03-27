import React from 'react';
import {cities} from '../../const';
import {connect} from 'react-redux';
import {changeCity} from '../../store/action';
import {PropTypes} from 'prop-types';

const Locations = ({onChangeCity, city}) => {
  const handleClickTabs = (currentCity) => {
    onChangeCity(currentCity);
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
  onChangeCity(city) {
    dispatch(changeCity(city));
  }
});

const mapStateToProps = ({city}) => ({
  city
});

Locations.propTypes = {
  onChangeCity: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired
};

export {Locations};
export default connect(mapStateToProps, mapDispatchToProps)(Locations);
