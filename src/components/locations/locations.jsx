import React from 'react';
import {cities} from '../../const';
import {useDispatch, useSelector} from 'react-redux';
import {changeCity} from '../../store/action';

const Locations = () => {
  const {city} = useSelector((state) => state.MAIN);
  const dispatch = useDispatch();

  const handleClickTabs = (currentCity) => {
    dispatch(changeCity(currentCity));
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

export default React.memo(Locations);
