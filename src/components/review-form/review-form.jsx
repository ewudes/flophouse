import React, {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {submitReview} from '../../store/api-actions';
import {setLoadingReviewStatus} from '../../store/action';
import {ReviewLoadingStatus, ReviewСharacters} from '../../const';

const ReviewForm = () => {
  const {offer, reviewLoadingStatus} = useSelector((state) => state.DATA);
  const dispatch = useDispatch();

  const {MAX_LENGTH: maxLength, MIN_LENGTH: minLength} = ReviewСharacters;

  const [reviewForm, setReviewForm] = useState({
    review: ``,
    rating: ``
  });

  const {review, rating} = reviewForm;

  const formRef = useRef();
  const submitButtonRef = useRef();
  const reviewRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (reviewForm) {
      dispatch(submitReview(offer.id, {review, rating}));
      setReviewForm({...reviewForm, review: ``, rating: ``});
      dispatch(setLoadingReviewStatus(ReviewLoadingStatus.LOADING));
    }
  };

  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setReviewForm({...reviewForm, [name]: value});
  };

  useEffect(() => {
    submitButtonRef.current.disabled = !(rating && review.length > minLength && review.length < maxLength);
  }, [review, rating]);

  useEffect(() => {
    switch (reviewLoadingStatus) {
      case ReviewLoadingStatus.LOADING:
        submitButtonRef.current.disabled = true;
        reviewRef.current.disabled = true;
        break;

      case ReviewLoadingStatus.LOADED:
        reviewRef.current.disabled = false;
        formRef.current.reset();

        setReviewForm({review: ``, rating: 0});
        dispatch(setLoadingReviewStatus(``));
        break;

      case ReviewLoadingStatus.LOADING_FAILED:
        submitButtonRef.current.disabled = false;
        reviewRef.current.disabled = false;
        dispatch(setLoadingReviewStatus(``));
        break;
    }
  }, [reviewLoadingStatus]);

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onChange={handleChange}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={``}
        ref={reviewRef}
        required
        maxLength={maxLength}
        minLength={minLength}
      ></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled ref={submitButtonRef}>Submit</button>
      </div>
    </form>
  );
};

export default ReviewForm;
