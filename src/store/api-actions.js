import {
  loadOffers,
  setOffer,
  setNearbyOffers,
  setReviews,
  redirectToRoute,
  requiredAuthorization,
  changeUserName,
  changeUserAvatar,
  setFavorites,
  toggleFavorite,
  addFavorites,
  removeFavorites,
  setErrorMessage,
  setLoadingReviewStatus,
} from './action';
import {
  AuthorizationStatus,
  ApiRoute,
  AppRoute,
  HttpCode,
  AVATAR,
  ReviewLoadingStatus,
} from './../const';
import {adaptOfferToClient, adaptReviewsToClient} from './adapters';
import {compareDates} from '../utils';

export const fetchOfferList = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.HOTELS)
  .then(({data}) => dispatch(loadOffers(data.map((offer)=> adaptOfferToClient(offer)))))
  .catch((err) => {
    const {response} = err;
    switch (response.status) {
      case HttpCode.UNAUTHORIZED:
        dispatch(redirectToRoute(AppRoute.LOGIN));
        dispatch(changeUserAvatar(AVATAR));
        break;

      default:
        dispatch(setErrorMessage(response.status));
        break;
    }
  })
);

export const fetchOfferData = (id) => (dispatch, _getState, api) => (
  Promise.all([
    api.get(`${ApiRoute.HOTELS}/${id}`),
    api.get(`${ApiRoute.HOTELS}/${id}/nearby`),
    api.get(`${ApiRoute.COMMENTS}/${id}`)
  ])
    .then(([offer, nearby, comments]) => {
      const sortedComments = comments.data.sort(compareDates);
      dispatch(setOffer(adaptOfferToClient(offer.data)));
      dispatch(setNearbyOffers(nearby.data.map((nearbyOffer) => adaptOfferToClient(nearbyOffer))));
      dispatch(setReviews(sortedComments.map((comment) => adaptReviewsToClient(comment))));
    })
    .catch((err) => {
      const {response} = err;
      switch (response.status) {
        case HttpCode.NOT_FOUND:
          dispatch(redirectToRoute(AppRoute.NOT_FOUND));
          break;

        default:
          dispatch(setErrorMessage(response.status));
          break;
      }
    })
);

export const checkAuth = () => (dispatch, _getState, api) => {
  return api.get(ApiRoute.LOGIN)
    .then(({data}) => {
      dispatch(requiredAuthorization(AuthorizationStatus.AUTH));
      dispatch(changeUserName(data.email));
      dispatch(changeUserAvatar(data[`avatar_url`]));
    })
    .catch(() => {
      dispatch(requiredAuthorization(AuthorizationStatus.NO_AUTH));
    });
};

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(ApiRoute.LOGIN, {email, password})
    .then(({data}) => {
      dispatch(requiredAuthorization(AuthorizationStatus.AUTH));
      dispatch(changeUserName(email));
      dispatch(changeUserAvatar(data[`avatar_url`]));
      dispatch(redirectToRoute(AppRoute.MAIN));
    })
    .catch(({response}) => {
      dispatch(setErrorMessage(response.status));
    })
);

export const logout = () => (dispatch, _getState, api) => {
  return api.get(ApiRoute.LOGOUT)
    .then(() => dispatch(requiredAuthorization(AuthorizationStatus.NO_AUTH)));
};

export const fetchFavorites = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.FAVORITES)
  .then(({data}) => dispatch(setFavorites(data.map((offer)=> adaptOfferToClient(offer)))))
);

export const onToggleFavorite = (id, status) => (dispatch, _getState, api) => (
  api.post(`${ApiRoute.FAVORITES}/${id}/${status}`)
    .then(({data}) => {
      const adaptedOffer = adaptOfferToClient(data);
      dispatch(toggleFavorite(adaptedOffer));

      if (status) {
        dispatch(addFavorites(adaptedOffer));
      } else {
        dispatch(removeFavorites(adaptedOffer.id));
      }

    })
    .catch((err) => {
      const {response} = err;
      switch (response.status) {
        case HttpCode.UNAUTHORIZED:
          dispatch(redirectToRoute(AppRoute.LOGIN));
          dispatch(changeUserAvatar(AVATAR));
          break;

        default:
          dispatch(setErrorMessage(response.status));
          break;
      }
    })
);

export const submitReview = (id, {review: comment, rating}) => (dispatch, _getState, api) => (
  api.post(`${ApiRoute.COMMENTS}/${id}`, {comment, rating})
    .then(({data}) => {
      const sortedComments = data.sort(compareDates);
      dispatch(setReviews(sortedComments.map((item) => adaptReviewsToClient(item))));
      dispatch(setLoadingReviewStatus(ReviewLoadingStatus.LOADED));
    })
    .catch((err) => {
      const {response} = err;
      switch (response.status) {
        case HttpCode.UNAUTHORIZED:
          dispatch(redirectToRoute(AppRoute.LOGIN));
          dispatch(changeUserAvatar(AVATAR));
          break;

        default:
          dispatch(setErrorMessage(response.status));
          dispatch(setLoadingReviewStatus(ReviewLoadingStatus.LOADING_FAILED));
          break;
      }
    })
);
