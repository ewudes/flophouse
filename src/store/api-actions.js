import {ActionCreator} from "./action";
import {AuthorizationStatus} from './../const';
import {adaptOfferToClient, adaptReviewsToClient} from "./adapters";
import {sortOffers} from "../utils";

export const fetchOfferList = () => (dispatch, _getState, api) => (
  api.get(`/hotels`)
  .then(({data}) => dispatch(ActionCreator.loadOffers(data.map((offer)=> adaptOfferToClient(offer)))))
);

export const fetchOfferData = (id) => (dispatch, _getState, api) => (
  Promise.all([
    api.get(`/hotels/${id}`),
    api.get(`/hotels/${id}/nearby`),
    api.get(`/comments/${id}`)
  ])
    .then(([offer, nearby, comments]) => {
      const sortedComments = comments.data.sort(sortOffers);
      dispatch(ActionCreator.setOffer(adaptOfferToClient(offer.data)));
      dispatch(ActionCreator.setNearbyOffers(nearby.data.map((nearbyOffer) => adaptOfferToClient(nearbyOffer))));
      dispatch(ActionCreator.setReviews(sortedComments.map((comment) => adaptReviewsToClient(comment))));
    })
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(() =>
      dispatch(ActionCreator.requiredAuthorization(AuthorizationStatus.AUTH))
    )
  .catch(()=> {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(`/login`, {email, password})
    .then(() => {
      dispatch(ActionCreator.requiredAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.changeUserName(email));
    })
);
