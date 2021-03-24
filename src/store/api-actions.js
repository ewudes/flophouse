import {ActionCreator} from "./action";
import {AuthorizationStatus, ApiRoute, AppRoute, HTTP_CODE, LOCAL_STORE_KEYS, avatar} from './../const';
import {adaptOfferToClient, adaptReviewsToClient} from "./adapters";
import {sortOffers} from "../utils";
import Store from "./local-store";

const STORE_AUTH_PREFIX = `sixcities-auth-localstorage`;
const STORE_VER = `v1`;
const STORE_AUTH_NAME = `${STORE_AUTH_PREFIX}-${STORE_VER}`;

const localStore = new Store(STORE_AUTH_NAME, window.localStorage);

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
    .catch((err) => {
      const {response} = err;
      switch (response.status) {
        case HTTP_CODE.NOT_FOUND:
          dispatch(ActionCreator.redirectToRoute(AppRoute.NOT_FOUND));
          break;

        default:
          throw err;
      }
    })
);

export const checkAuth = () => (dispatch, _getState, api) => {
  const {authorizationStatus, email, avatarUrl} = localStore.getItems();

  if (authorizationStatus === AuthorizationStatus.AUTH) {
    dispatch(ActionCreator.requiredAuthorization(AuthorizationStatus.AUTH));
    dispatch(ActionCreator.changeUserName(email));
    dispatch(ActionCreator.changeUserAvatar(avatarUrl));
    return;
  }

  api.get(ApiRoute.LOGIN)
    .then(({data}) => {
      dispatch(ActionCreator.requiredAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.changeUserName(data.email));
      dispatch(ActionCreator.changeUserAvatar(data[`avatar_url`]));
    })
    .catch(() => { });
};

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(ApiRoute.LOGIN, {email, password})
    .then(({data}) => {
      dispatch(ActionCreator.requiredAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.changeUserName(email));
      dispatch(ActionCreator.changeUserAvatar(data[`avatar_url`]));

      localStore.setItem(LOCAL_STORE_KEYS.AUTH, AuthorizationStatus.AUTH);
      localStore.setItem(LOCAL_STORE_KEYS.EMAIL, email);
      localStore.setItem(LOCAL_STORE_KEYS.AVATAR_URL, data[`avatar_url`]);
    })
  .then(()=> dispatch(ActionCreator.redirectToRoute(AppRoute.MAIN)))
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
          dispatch(ActionCreator.changeUserAvatar(avatar));
          localStore.removeItem(LOCAL_STORE_KEYS.AUTH);
          localStore.removeItem(LOCAL_STORE_KEYS.EMAIL);
          localStore.removeItem(LOCAL_STORE_KEYS.AVATAR_URL);
          break;

        default:
          throw err;
      }
    })
);
