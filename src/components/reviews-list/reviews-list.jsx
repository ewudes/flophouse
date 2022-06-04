import React from 'react';
import Review from '../review-item/review-item';
import PropTypes from 'prop-types';
import {reviewProps} from '../prop-types/prop-types';

const ReviewsList = ({reviews}) => {
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((comment) => <Review {...comment} key={comment.id} />)}
      </ul>
    </>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewProps)).isRequired,
};

export default ReviewsList;
