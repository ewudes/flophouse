export const cities = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];

export const AVATAR = `../img/avatar.svg`;

export const SortType = {
  POPULAR: `popular`,
  LOW_PRICE: `low-price`,
  HIGH_PRICE: `high-price`,
  TOP_RATED: `top-rated`
};

export const SortText = {
  [SortType.POPULAR]: `Popular`,
  [SortType.LOW_PRICE]: `Price: low to high`,
  [SortType.HIGH_PRICE]: `Price: high to low`,
  [SortType.TOP_RATED]: `Top rated first`,
};

export const SortList = [
  {
    text: SortText[SortType.POPULAR],
    type: SortType.POPULAR
  },
  {
    text: SortText[SortType.LOW_PRICE],
    type: SortType.LOW_PRICE
  },
  {
    text: SortText[SortType.HIGH_PRICE],
    type: SortType.HIGH_PRICE
  },
  {
    text: SortText[SortType.TOP_RATED],
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

export const ReviewСharacters = {
  MAX_LENGTH: 300,
  MIN_LENGTH: 50
};

export const ReviewLoadingStatus = {
  LOADED: `loaded`,
  LOADING: `loading`,
  LOADING_FAILED: `loadingFailed`
};
