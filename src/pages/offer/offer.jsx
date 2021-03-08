import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import Header from '../../components/header/header';
import ReviewList from '../../components/reviewsList/reviewsList';
import ReviewForm from '../../components/reviewForm/reviewForm';
import NearPlaces from '../../components/nearPlacesList/nearPlacesList';
import {offerProps, reviewProps} from '../../components/propTypes/propTypes';
import Map from '../../components/map/map';

const FACTOR = 20;

const getCurrentOffer = (id, offers) => offers.find((item) => Number(id) === item.id);

const Offer = ({offers, reviews, nearPlaces, ...props}) => {
  const id = props.match.params.id;
  const offer = getCurrentOffer(id, offers);

  const setNearPlaces = (places, count) => places.slice(0, count);

  if (!offer) {
    return <Redirect to="/404" />;
  }

  const {
    images,
    isPremium,
    isFavorite,
    title,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    description,
  } = offer;

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((image, index) => (
                <div className="property__image-wrapper" key={index}>
                  <img className="property__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && <div className="property__mark"><span>Premium</span></div> || ``}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className={`property__bookmark-button button${isFavorite && ` property__bookmark-button--active` || ``}`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: FACTOR * rating + `%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good, index) => (
                    <li className="property__inside-item" key={index}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper user__avatar-wrapper${host.isPro && ` property__avatar-wrapper--pro` || ``}`}>
                    <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <ReviewList
                  reviews={reviews}
                />
                <ReviewForm/>
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map
              points={setNearPlaces(nearPlaces, 3)}
              cityLocation={nearPlaces[0].city.location}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <NearPlaces
              nearPlaces={setNearPlaces(nearPlaces, 3)}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

Offer.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerProps)).isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewProps)).isRequired,
  nearPlaces: PropTypes.arrayOf(PropTypes.shape(offerProps)).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      experiment: PropTypes.string,
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Offer;
