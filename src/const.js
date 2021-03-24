export const CITIES = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];

export const avatar = `../img/avatar.svg`;

export const SORT_TYPES = {
  POPULAR: `popular`,
  LOW_PRICE: `low-price`,
  HIGH_PRICE: `high-price`,
  TOP_RATED: `top-rated`
};

export const SORT_LIST = [
  {
    text: `Popular`,
    type: SORT_TYPES.POPULAR
  },
  {
    text: `Price: low to high`,
    type: SORT_TYPES.LOW_PRICE
  },
  {
    text: `Price: high to low`,
    type: SORT_TYPES.HIGH_PRICE
  },
  {
    text: `Top rated first`,
    type: SORT_TYPES.TOP_RATED
  },
];

export const AppRoute = {
  MAIN: `/`,
  OFFER: `/offer/:id`,
  LOGIN: `/login`,
  FAVORITES: `/favorites`,
  NOT_FOUND: `/404`
};

export const ApiRoute = {
  HOTELS: `/hotels`,
  FAVORITES: `/favorite`,
  COMMENTS: `/comments`,
  LOGIN: `/login`,
};

export const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`
};

export const HTTP_CODE = {
  UNAUTHORIZED: 401,
  NOT_FOUND: 404
};

export const LOCAL_STORE_KEYS = {
  AUTH: `authorizationStatus`,
  EMAIL: `email`,
  AVATAR_URL: `avatarUrl`
};
