import React from 'react';
import {CITIES} from '../../const';
import {useDispatch, useSelector} from 'react-redux';
import {changeCity} from '../../store/action';
import {getCity} from '../../store/selectors';

const Locations = () => {
  const city = useSelector(getCity);
  const dispatch = useDispatch();

  const handleClickTabs = (currentCity) => {
    dispatch(changeCity(currentCity));
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list" >
        {CITIES.map((item) => <li key={item} className="locations__item">
          <a className={`locations__item-link tabs__item ${item === city ? `tabs__item--active` : ``}`} href="#">
            <span onClick={() => handleClickTabs(item)}>{item}</span>
          </a>
        </li>)}
      </ul>
    </section>
  );
};

export default React.memo(Locations);
