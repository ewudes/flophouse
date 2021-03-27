export const cities = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];

export const AVATAR = `../img/avatar.svg`;

export const SortType = {
  POPULAR: `popular`,
  LOW_PRICE: `low-price`,
  HIGH_PRICE: `high-price`,
  TOP_RATED: `top-rated`
};

export const SortList = [
  {
    text: `Popular`,
    type: SortType.POPULAR
  },
  {
    text: `Price: low to high`,
    type: SortType.LOW_PRICE
  },
  {
    text: `Price: high to low`,
    type: SortType.HIGH_PRICE
  },
  {
    text: `Top rated first`,
    type: SortType.TOP_RATED
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

export const HttpCode = {
  UNAUTHORIZED: 401,
  NOT_FOUND: 404
};

export const StoreKey = {
  AUTH: `authorizationStatus`,
  EMAIL: `email`,
  AVATAR_URL: `avatarUrl`
};
