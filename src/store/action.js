export const ActionType = {
  CHANGE_CITY: `changeCity`,
  SET_ACTIVE_PIN: `setActivePin`,
  DELETE_ACTIVE_PIN: `deleteActivePin`
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  }),
  setActivePin: (id) => ({
    type: ActionType.SET_ACTIVE_PIN,
    payload: id
  }),
  deleteActivePin: () => ({
    type: ActionType.DELETE_ACTIVE_PIN
  })
};
