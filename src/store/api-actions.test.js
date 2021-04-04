import MockAdapter from 'axios-mock-adapter';
import {
  AuthorizationStatus,
  ApiRoute,
  AppRoute,
  AVATAR,
  ReviewLoadingStatus,
} from './../const';
import {createApi} from './../services/api';
import {ActionType} from './action';
import {
  fetchOfferList,
  fetchOfferData,
  checkAuth,
  login,
  logout,
  fetchFavorites,
  onToggleFavorite,
  submitReview
} from './api-actions';

const api = createApi(() => {});

const initialOffer = {
  "id": 1,
  "host": {
    "avatar_url": `image/avatar.jpg`,
    "is_pro": false
  },
  "is_favorite": false,
  "is_premium": false,
  "max_adults": 4,
  "preview_image": `image/preview.png`
};

const adaptedOffer = {
  "id": 1,
  "host": {
    "avatarUrl": `image/avatar.jpg`,
    "isPro": false
  },
  "isFavorite": false,
  "isPremium": false,
  "maxAdults": 4,
  "previewImage": `image/preview.png`
};

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to /hotels`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offerLoader = fetchOfferList();

    apiMock
      .onGet(ApiRoute.HOTELS)
      .reply(200, [initialOffer]);

    return offerLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: [adaptedOffer]
        });
      });
  });

  it(`Should make a correct API call to /hotels/:id, /hotels/:id/nearby and /comments/:id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offerId = 1;
    const openedOfferDataLoader = fetchOfferData(offerId);

    apiMock
      .onGet(`${ApiRoute.HOTELS}/${offerId}`)
      .reply(200, initialOffer);

    apiMock
      .onGet(`${ApiRoute.HOTELS}/${offerId}/nearby`)
      .reply(200, [initialOffer]);

    apiMock
      .onGet(`${ApiRoute.COMMENTS }/${offerId}`)
      .reply(200, [{
        "user": {
          "is_pro": false,
          "avatar_url": `image/avatar.jpg`
        }
      }]);

    return openedOfferDataLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_OFFER,
          payload: adaptedOffer
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_NEARBY_OFFERS,
          payload: [adaptedOffer]
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.SET_REVIEWS,
          payload: [{
            "user": {
              "isPro": false,
              "avatarUrl": `image/avatar.jpg`
            }
          }]
        });
      });
  });

  it(`The API call to /hotels/:id, /hotels/:id/nearby and /comments/:id had resulted in error 404`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offerId = 1;
    const openedOfferData = fetchOfferData(offerId);

    apiMock
      .onGet(`${ApiRoute.HOTELS}/${offerId}`)
      .reply(404, {response: {status: 404}});

    return openedOfferData(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: AppRoute.NOT_FOUND
        });
      });
  });

  it(`The API call to /hotels/:id, /hotels/:id/nearby and /comments/:id had resulted in an error other then 404`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offerId = 1;
    const openedOfferData = fetchOfferData(offerId);

    apiMock
      .onGet(`${ApiRoute.HOTELS}/${offerId}`)
      .reply(401, {response: {status: 401}});

    return openedOfferData(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_ERROR_MESSAGE,
          payload: 401
        });
      });
  });

  it(`Should make a correct API call to /favorite`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoritesLoader = fetchFavorites();

    apiMock
      .onGet(ApiRoute.FAVOR)
      .reply(200, [initialOffer]);

    return favoritesLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_FAVORITES,
          payload: [adaptedOffer]
        });
      });
  });

  it(`The API call to /favorite had resulted in error 401`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteListLoader = fetchFavorites();

    apiMock
      .onGet(ApiRoute.FAVOR)
      .reply(401, {response: {status: 401}});

    return favoriteListLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: AppRoute.LOGIN
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_USER_AVATAR,
          payload: AVATAR
        });
      });
  });

  it(`The API call to /favorite had resulted in an error other then 401`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoritesLoader = fetchFavorites();

    apiMock
      .onGet(ApiRoute.FAVOR)
      .reply(404, {response: {status: 404}});

    return favoritesLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_ERROR_MESSAGE,
          payload: 404
        });

      });
  });

  it(`Should make a correct API call to /favorite/:id/:status if the status is true`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offerId = 1;
    const status = 1;
    const onTogglerFavorite = onToggleFavorite(offerId, status);

    apiMock
      .onPost(`${ApiRoute.FAVOR}/${offerId}/${status}`)
      .reply(200, initialOffer);

    return onTogglerFavorite(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.TOGGLE_FAVORITE,
          payload: adaptedOffer
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.ADD_FAVORITES,
          payload: adaptedOffer
        });
      });
  });

  it(`Should make a correct API call to /favorite/:id/:status if the status is false`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offerId = 1;
    const status = 0;
    const onTogglerFavorite = onToggleFavorite(offerId, status);

    apiMock
      .onPost(`${ApiRoute.FAVOR}/${offerId}/${status}`)
      .reply(200, initialOffer);

    return onTogglerFavorite(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.TOGGLE_FAVORITE,
          payload: adaptedOffer
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REMOVE_FAVORITES,
          payload: adaptedOffer.id
        });
      });
  });

  it(`The API call to /favorite/:id/:status had resulted in error 401`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offerId = 1;
    const status = 1;
    const onTogglerFavorite = onToggleFavorite(offerId, status);

    apiMock
      .onPost(`${ApiRoute.FAVOR}/${offerId}/${status}`)
      .reply(401, {response: {status: 401}});

    return onTogglerFavorite(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: AppRoute.LOGIN
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_USER_AVATAR,
          payload: AVATAR
        });
      });
  });

  it(`The API call to /favorite/:id/:status had resulted in an error other then 401`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offerId = 1;
    const status = 1;
    const onTogglerFavorite = onToggleFavorite(offerId, status);

    apiMock
      .onPost(`${ApiRoute.FAVOR}/${offerId}/${status}`)
      .reply(404, {response: {status: 404}});

    return onTogglerFavorite(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_ERROR_MESSAGE,
          payload: 404
        });
      });
  });

  it(`Should make a correct API call to /comments/:id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentId = 1;
    const testComment = {comment: `it couldn't be worse!`, rating: 4};
    const submitterReview = submitReview(commentId, testComment);

    apiMock
      .onPost(`${ApiRoute.COMMENTS}/${commentId}`)
      .reply(200, [{
        "comment": `it couldn't be worse!`,
        "date": `2019-06-08T14:13:56.569Z`,
        "id": 1,
        "rating": 4,
        "user": {
          "avatar_url": `img/1.png`,
          "id": 4,
          "is_pro": false,
          "name": `Max`
        }
      },
      ]);
    return submitterReview(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_REVIEWS,
          payload: [
            {
              "comment": `it couldn't be worse!`,
              "date": `2019-06-08T14:13:56.569Z`,
              "id": 1,
              "rating": 4,
              "user": {
                "avatarUrl": `img/1.png`,
                "isPro": false,
              }
            }]
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_LOADING_REVIEW_STATUS,
          payload: ReviewLoadingStatus.LOADED
        });
      });
  });

  it(`The API call to /comments/:id had resulted in error 401`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentId = 1;
    const testComment = {comment: `it couldn't be worse!`, rating: 4};
    const submitterReview = submitReview(commentId, testComment);

    apiMock
      .onPost(`${ApiRoute.COMMENTS}/${commentId}`)
      .reply(401, {response: {status: 401}});

    return submitterReview(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: AppRoute.LOGIN
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_USER_AVATAR,
          payload: AVATAR
        });
      });
  });

  it(`The API call to /comments/:id had resulted in an error other then 401`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentId = 1;
    const testComment = {comment: `it couldn't be worse!`, rating: 4};
    const submitterReview = submitReview(commentId, testComment);

    apiMock
      .onPost(`${ApiRoute.COMMENTS}/${commentId}`)
      .reply(404, {response: {status: 404}});

    return submitterReview(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_ERROR_MESSAGE,
          payload: 404
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_LOADING_REVIEW_STATUS,
          payload: ReviewLoadingStatus.LOADING_FAILED
        });
      });
  });

  it(`Should pull the user data from local storage if authorization status is correct`, () => {
    const dispatch = jest.fn();
    const checkAuthLoader = checkAuth();

    checkAuthLoader(dispatch, () => { }, api);
    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: ActionType.CHANGE_USER_NAME,
      payload: `email@mail.com`
    });
    expect(dispatch).toHaveBeenNthCalledWith(3, {
      type: ActionType.CHANGE_USER_AVATAR,
      payload: `image.avatar.jpg`
    });
  });

  it(`Should make a correct API call to /login to check authorization status`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    const checkAuthLoader = checkAuth();

    apiMock
      .onGet(ApiRoute.LOGIN)
      .reply(200, {"email": `email@mail.com`, "avatar_url": `image.avatar.jpg`});

    return checkAuthLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_USER_NAME,
          payload: `email@mail.com`
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.CHANGE_USER_AVATAR,
          payload: `image.avatar.jpg`
        });
      });
  });

  it(`Should make a correct API call to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {email: `email@mail.com`, password: `123`};
    const loginLoader = login(fakeUser);

    apiMock
      .onPost(ApiRoute.LOGIN)
      .reply(200, {"email": `email@mail.com`, "avatar_url": `image.avatar.jpg`});

    return loginLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_USER_NAME,
          payload: `email@mail.com`
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.CHANGE_USER_AVATAR,
          payload: `image.avatar.jpg`
        });

        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: AppRoute.MAIN
        });
      });
  });

  it(`The API call to /login had resulted in an error`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {email: `email@mail.com`, password: `123`};
    const loginLoader = login(fakeUser);

    apiMock
      .onPost(ApiRoute.LOGIN)
      .reply(400, {response: 400});

    return loginLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_ERROR_MESSAGE,
          payload: 400
        });
      });
  });

  it(`Should make a correct API call to /logout`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logoutLoader = logout();

    apiMock
      .onGet(ApiRoute.LOGOUT)
      .reply(200, {});

    return logoutLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.NO_AUTH
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_USER_AVATAR,
          payload: AVATAR
        });
      });
  });

  it(`The API call to /logout had resulted in an error`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logoutLoader = logout();

    apiMock
      .onGet(ApiRoute.LOGOUT)
      .reply(400, {response: 400});

    return logoutLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_ERROR_MESSAGE,
          payload: 400
        });
      });
  });
});
