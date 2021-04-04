import {
  ActionType,
  changeCity,
  setActivePin,
  deleteActivePin,
  changeSort,
  loadOffers,
  setOffer,
  setReviews,
  setLoadingReviewStatus,
  setNearbyOffers,
  requiredAuthorization,
  changeUserAvatar,
  changeUserName,
  setFavorites,
  addFavorites,
  removeFavorites,
  toggleFavorite,
  redirectToRoute,
  setErrorMessage
} from './action';

describe(`Action creators work correctly`, () => {
  it(`Action creator for city swapping returns correct action`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_CITY,
      payload: `Paris`
    };
    expectedAction(changeCity(`Paris`)).toEqual(expectedAction);
  });

  it(`Action creator for setting active pin returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_ACTIVE_PIN,
      payload: 12
    };
    expect(setActivePin(12)).toEqual(expectedAction);
  });

  it(`Action creator for delete active pin returns correct action`, () => {
    const expectedAction = {
      type: ActionType.DELETE_ACTIVE_PIN,
    };
    expect(deleteActivePin()).toEqual(expectedAction);
  });

  it(`Action creator for changing current sorting type returns correct action`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_SORT,
      payload: `Popular`
    };
    expect(changeSort(`Popular`)).toEqual(expectedAction);
  });

  it(`Action creator for loading offers returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_OFFERS,
      payload: [{
        "bedrooms": 3,
        "city": {
          "location": {
            "latitude": 52.370216,
            "longitude": 4.895168,
            "zoom": 10
          },
          "name": `Amsterdam`
        },
        "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
        "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
        "host": {
          "avatar_url": `img/1.png`,
          "id": 3,
          "is_pro": true,
          "name": `Angelina`
        },
        "id": 1,
        "images": [`img/1.png`, `img/2.png`],
        "is_favorite": false,
        "is_premium": false,
        "location": {
          "latitude": 52.35514938496378,
          "longitude": 4.673877537499948,
          "zoom": 8
        },
        "max_adults": 4,
        "preview_image": `img/1.png`,
        "price": 120,
        "rating": 4.8,
        "title": `Beautiful & luxurious studio at great location`,
        "type": `apartment`
      }]
    };

    expect(loadOffers([{
      "bedrooms": 3,
      "city": {
        "location": {
          "latitude": 52.370216,
          "longitude": 4.895168,
          "zoom": 10
        },
        "name": `Amsterdam`
      },
      "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
      "host": {
        "avatar_url": `img/1.png`,
        "id": 3,
        "is_pro": true,
        "name": `Angelina`
      },
      "id": 1,
      "images": [`img/1.png`, `img/2.png`],
      "is_favorite": false,
      "is_premium": false,
      "location": {
        "latitude": 52.35514938496378,
        "longitude": 4.673877537499948,
        "zoom": 8
      },
      "max_adults": 4,
      "preview_image": `img/1.png`,
      "price": 120,
      "rating": 4.8,
      "title": `Beautiful & luxurious studio at great location`,
      "type": `apartment`
    }])).toEqual(expectedAction);
  });

  it(`Action creator for toggling favorite returns correct action`, () => {
    const expectedAction = {
      type: ActionType.TOGGLE_FAVORITE,
      payload: 15
    };
    expect(toggleFavorite(15)).toEqual(expectedAction);
  });

  it(`Action creator for setting open offer returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_OFFER,
      payload: {
        "bedrooms": 3,
        "city": {
          "location": {
            "latitude": 52.370216,
            "longitude": 4.895168,
            "zoom": 10
          },
          "name": `Amsterdam`
        },
        "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
        "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
        "host": {
          "avatar_url": `img/1.png`,
          "id": 3,
          "is_pro": true,
          "name": `Angelina`
        },
        "id": 1,
        "images": [`img/1.png`, `img/2.png`],
        "is_favorite": false,
        "is_premium": false,
        "location": {
          "latitude": 52.35514938496378,
          "longitude": 4.673877537499948,
          "zoom": 8
        },
        "max_adults": 4,
        "preview_image": `img/1.png`,
        "price": 120,
        "rating": 4.8,
        "title": `Beautiful & luxurious studio at great location`,
        "type": `apartment`
      }
    };

    expect(setOffer({
      "bedrooms": 3,
      "city": {
        "location": {
          "latitude": 52.370216,
          "longitude": 4.895168,
          "zoom": 10
        },
        "name": `Amsterdam`
      },
      "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
      "host": {
        "avatar_url": `img/1.png`,
        "id": 3,
        "is_pro": true,
        "name": `Angelina`
      },
      "id": 1,
      "images": [`img/1.png`, `img/2.png`],
      "is_favorite": false,
      "is_premium": false,
      "location": {
        "latitude": 52.35514938496378,
        "longitude": 4.673877537499948,
        "zoom": 8
      },
      "max_adults": 4,
      "preview_image": `img/1.png`,
      "price": 120,
      "rating": 4.8,
      "title": `Beautiful & luxurious studio at great location`,
      "type": `apartment`
    })).toEqual(expectedAction);
  });

  it(`Action creator for setting nearby offers returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_NEARBY_OFFERS,
      payload: [{
        "bedrooms": 3,
        "city": {
          "location": {
            "latitude": 52.370216,
            "longitude": 4.895168,
            "zoom": 10
          },
          "name": `Amsterdam`
        },
        "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
        "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
        "host": {
          "avatar_url": `img/1.png`,
          "id": 3,
          "is_pro": true,
          "name": `Angelina`
        },
        "id": 1,
        "images": [`img/1.png`, `img/2.png`],
        "is_favorite": false,
        "is_premium": false,
        "location": {
          "latitude": 52.35514938496378,
          "longitude": 4.673877537499948,
          "zoom": 8
        },
        "max_adults": 4,
        "preview_image": `img/1.png`,
        "price": 120,
        "rating": 4.8,
        "title": `Beautiful & luxurious studio at great location`,
        "type": `apartment`
      }]
    };

    expect(setNearbyOffers([{
      "bedrooms": 3,
      "city": {
        "location": {
          "latitude": 52.370216,
          "longitude": 4.895168,
          "zoom": 10
        },
        "name": `Amsterdam`
      },
      "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
      "host": {
        "avatar_url": `img/1.png`,
        "id": 3,
        "is_pro": true,
        "name": `Angelina`
      },
      "id": 1,
      "images": [`img/1.png`, `img/2.png`],
      "is_favorite": false,
      "is_premium": false,
      "location": {
        "latitude": 52.35514938496378,
        "longitude": 4.673877537499948,
        "zoom": 8
      },
      "max_adults": 4,
      "preview_image": `img/1.png`,
      "price": 120,
      "rating": 4.8,
      "title": `Beautiful & luxurious studio at great location`,
      "type": `apartment`
    }])).toEqual(expectedAction);
  });

  it(`Action creator for setting current reviews returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_REVIEWS,
      payload: [{
        "comment": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
        "date": `2019-05-08T14:13:56.569Z`,
        "id": 1,
        "rating": 4,
        "user": {
          "avatar_url": `img/1.png`,
          "id": 4,
          "is_pro": false,
          "name": `Max`
        }
      }]
    };

    expect(setReviews([{
      "comment": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      "date": `2019-05-08T14:13:56.569Z`,
      "id": 1,
      "rating": 4,
      "user": {
        "avatar_url": `img/1.png`,
        "id": 4,
        "is_pro": false,
        "name": `Max`
      }
    }])).toEqual(expectedAction);
  });

  it(`Action creator for updating review loading status returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_LOADING_REVIEW_STATUS,
      payload: `Loading`
    };
    expect(setLoadingReviewStatus(`Loading`)).toEqual(expectedAction);
  });

  it(`Action creator for setting favorite list status returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_FAVORITES,
      payload: [{
        "bedrooms": 3,
        "city": {
          "location": {
            "latitude": 52.370216,
            "longitude": 4.895168,
            "zoom": 10
          },
          "name": `Amsterdam`
        },
        "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
        "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
        "host": {
          "avatar_url": `img/1.png`,
          "id": 3,
          "is_pro": true,
          "name": `Angelina`
        },
        "id": 1,
        "images": [`img/1.png`, `img/2.png`],
        "is_favorite": false,
        "is_premium": false,
        "location": {
          "latitude": 52.35514938496378,
          "longitude": 4.673877537499948,
          "zoom": 8
        },
        "max_adults": 4,
        "preview_image": `img/1.png`,
        "price": 120,
        "rating": 4.8,
        "title": `Beautiful & luxurious studio at great location`,
        "type": `apartment`
      }]
    };
    expect(setFavorites([{
      "bedrooms": 3,
      "city": {
        "location": {
          "latitude": 52.370216,
          "longitude": 4.895168,
          "zoom": 10
        },
        "name": `Amsterdam`
      },
      "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
      "host": {
        "avatar_url": `img/1.png`,
        "id": 3,
        "is_pro": true,
        "name": `Angelina`
      },
      "id": 1,
      "images": [`img/1.png`, `img/2.png`],
      "is_favorite": false,
      "is_premium": false,
      "location": {
        "latitude": 52.35514938496378,
        "longitude": 4.673877537499948,
        "zoom": 8
      },
      "max_adults": 4,
      "preview_image": `img/1.png`,
      "price": 120,
      "rating": 4.8,
      "title": `Beautiful & luxurious studio at great location`,
      "type": `apartment`
    }])).toEqual(expectedAction);
  });

  it(`Action creator for adding card to favorite list status returns correct action`, () => {
    const expectedAction = {
      type: ActionType.ADD_FAVORITES,
      payload: {
        "bedrooms": 3,
        "city": {
          "location": {
            "latitude": 52.370216,
            "longitude": 4.895168,
            "zoom": 10
          },
          "name": `Amsterdam`
        },
        "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
        "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
        "host": {
          "avatar_url": `img/1.png`,
          "id": 3,
          "is_pro": true,
          "name": `Angelina`
        },
        "id": 1,
        "images": [`img/1.png`, `img/2.png`],
        "is_favorite": false,
        "is_premium": false,
        "location": {
          "latitude": 52.35514938496378,
          "longitude": 4.673877537499948,
          "zoom": 8
        },
        "max_adults": 4,
        "preview_image": `img/1.png`,
        "price": 120,
        "rating": 4.8,
        "title": `Beautiful & luxurious studio at great location`,
        "type": `apartment`
      }
    };
    expect(addFavorites({
      "bedrooms": 3,
      "city": {
        "location": {
          "latitude": 52.370216,
          "longitude": 4.895168,
          "zoom": 10
        },
        "name": `Amsterdam`
      },
      "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
      "host": {
        "avatar_url": `img/1.png`,
        "id": 3,
        "is_pro": true,
        "name": `Angelina`
      },
      "id": 1,
      "images": [`img/1.png`, `img/2.png`],
      "is_favorite": false,
      "is_premium": false,
      "location": {
        "latitude": 52.35514938496378,
        "longitude": 4.673877537499948,
        "zoom": 8
      },
      "max_adults": 4,
      "preview_image": `img/1.png`,
      "price": 120,
      "rating": 4.8,
      "title": `Beautiful & luxurious studio at great location`,
      "type": `apartment`
    })).toEqual(expectedAction);
  });

  it(`Action creator for removing card from favorite list returns correct action`, () => {
    const expectedAction = {
      type: ActionType.REMOVE_FAVORITES,
      payload: 10
    };
    expect(removeFavorites(10)).toEqual(expectedAction);
  });

  it(`Action creator for requiring authorization returns correct action`, () => {
    const expectedAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: `AUTH`
    };
    expect(requiredAuthorization(`AUTH`)).toEqual(expectedAction);
  });

  it(`Action creator for changing user name returns correct action`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_USER_NAME,
      payload: `Kirill`
    };
    expect(changeUserName(`Kirill`)).toEqual(expectedAction);
  });

  it(`Action creator for changing user avatar returns correct action`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_USER_AVATAR,
      payload: `image/avatar.jpg`
    };
    expect(changeUserAvatar(`image/avatar.jpg`)).toEqual(expectedAction);
  });

  it(`Action creator for redirecting to route page returns correct action`, () => {
    const expectedAction = {
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: `site/main`
    };
    expect(redirectToRoute(`site/main`)).toEqual(expectedAction);
  });

  it(`Action creator for setting error message returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_ERROR_MESSAGE,
      payload: `Oops 404. I am so sorry!`
    };
    expect(setErrorMessage(`Oops 404. I am so sorry!`)).toEqual(expectedAction);
  });
});
