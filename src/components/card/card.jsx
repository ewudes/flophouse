import React from 'react';
import PropTypes from 'prop-types';

const FACTOR = 20;

const CARD_TYPES = {
  main: {
    articleClassName: `cities__place-card`,
    infoClassName: ``,
    img: {
      className: `cities`,
      width: `260`,
      height: `200`,
    },
  },
  favorites: {
    articleClassName: `favorites__card`,
    infoClassName: `favorites__card-info`,
    img: {
      className: `favorites`,
      width: `150`,
      height: `110`,
    }
  }
};

const Card = ({
  isPremium,
  isFavorite,
  previewImage,
  price,
  rating,
  title,
  type,
  cardOption,
}) => {
  const cardType = CARD_TYPES[cardOption];

  return (
    <article className={`${cardType.articleClassName} place-card`}>
      {isPremium && <div className="place-card__mark"><span>Premium</span></div> || ``}
      <div className={`${cardType.img.className}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={previewImage} width={cardType.img.width} height={cardType.img.height} alt="Place image" />
        </a>
      </div>
      <div className={`${cardType.infoClassName} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${isFavorite && ` place-card__bookmark-button--active` || ``}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref={`#icon-bookmark`}></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: FACTOR * rating + `%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

Card.propTypes = {
  isPremium: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  previewImage: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  cardOption: PropTypes.string.isRequired,
};

export default Card;
