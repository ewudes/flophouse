import React, {useEffect} from 'react';
import {useRouteMatch} from 'react-router-dom';
import Header from '../../components/header/header';
import ReviewList from '../../components/reviews-list/reviews-list';
import ReviewForm from '../../components/review-form/review-form';
import NearPlaces from '../../components/near-places-list/near-places-list';
import Map from '../../components/map/map';
import {useDispatch, useSelector} from 'react-redux';
import {fetchOfferData, onToggleFavorite} from '../../store/api-actions';
import Spinner from '../../components/spinner/spinner';
import {isAuthorized} from '../../utils';
import ErrorMessage from '../../components/error-message/error-message';
import {getCity, getAuthorizationStatus, getOffer, getNearbyOffers, getReviews} from '../../store/selectors';

const FACTOR = 20;

const Offer = () => {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const city = useSelector(getCity);
  const offer = useSelector(getOffer);
  const nearbyOffers = useSelector(getNearbyOffers);
  const reviews = useSelector(getReviews);
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const pathId = match.params.id;

  useEffect(() => {
    if (String(offer.id) !== pathId) {
      dispatch(fetchOfferData(pathId));
    }
  }, [pathId]);

  if (String(offer.id) !== pathId) {
    return (
      <Spinner />
    );
  }

  const {
    id,
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

  const handleClickFavorite = () => {
    const newStatus = Number(!isFavorite);
    dispatch(onToggleFavorite(id, newStatus));

  };

  return (
    <div className="page">
      <ErrorMessage/>
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.slice(0, 6).map((image, index) => (
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
                <button
                  className={`property__bookmark-button button${isFavorite && ` property__bookmark-button--active` || ``}`}
                  type="button"
                  onClick={handleClickFavorite}
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: FACTOR * Math.round(rating) + `%`}}></span>
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
                {isAuthorized(authorizationStatus) && <ReviewForm/>}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map
              points={[...nearbyOffers, offer]}
              city={city}
              cardOption={`offer`}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <NearPlaces
              nearPlaces={nearbyOffers}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Offer;
