import {ActionCreator} from "./action";
import {AuthorizationStatus, ApiRoute, AppRoute, HTTP_CODE} from './../const';
import {adaptOfferToClient, adaptReviewsToClient} from "./adapters";
import {sortOffers} from "../utils";

export const fetchOfferList = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.HOTELS)
  .then(({data}) => dispatch(ActionCreator.loadOffers(data.map((offer)=> adaptOfferToClient(offer)))))
);

export const fetchOfferData = (id) => (dispatch, _getState, api) => (
  Promise.all([
    api.get(`${ApiRoute.HOTELS}/${id}`),
    api.get(`${ApiRoute.HOTELS}/${id}/nearby`),
    api.get(`${ApiRoute.COMMENTS}/${id}`)
  ])
    .then(([offer, nearby, comments]) => {
      const sortedComments = comments.data.sort(sortOffers);
      dispatch(ActionCreator.setOffer(adaptOfferToClient(offer.data)));
      dispatch(ActionCreator.setNearbyOffers(nearby.data.map((nearbyOffer) => adaptOfferToClient(nearbyOffer))));
      dispatch(ActionCreator.setReviews(sortedComments.map((comment) => adaptReviewsToClient(comment))));
    })
);

export const checkAuth = () => (dispatch, _getState, api) => {
  api.get(ApiRoute.LOGIN)
    .then(() =>
      dispatch(ActionCreator.requiredAuthorization(AuthorizationStatus.AUTH))
    )
  .catch(()=> { });
};

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(ApiRoute.LOGIN, {email, password})
    .then(() => {
      dispatch(ActionCreator.requiredAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.changeUserName(email));
    })
    .then(() => dispatch(ActionCreator.redirectToRoute(AppRoute.MAIN)))
);

export const fetchFavorites = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.FAVORITES)
  .then(({data}) => dispatch(ActionCreator.setFavorites(data.map((offer)=> adaptOfferToClient(offer)))))
);

export const toggleFavorite = (id, status) => (dispatch, _getState, api) => (
  api.post(`${ApiRoute.FAVORITES}/${id}/${status}`)
    .then(({data}) => {
      const adaptedOffer = adaptOfferToClient(data);
      dispatch(ActionCreator.toggleFavorite(adaptedOffer));

      if (status) {
        dispatch(ActionCreator.addFavorites(adaptedOffer));
      } else {
        dispatch(ActionCreator.removeFavorites(adaptedOffer.id));
      }

    })
    .catch((err) => {
      const {response} = err;
      switch (response.status) {
        case HTTP_CODE.UNAUTHORIZED:
          dispatch(ActionCreator.redirectToRoute(AppRoute.LOGIN));
          break;

        default:
          throw err;
      }
    })
);
