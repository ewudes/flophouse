export const ActionType = {
  CHANGE_CITY: `changeCity`,
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  }),
};
