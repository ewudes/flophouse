import {AuthorizationStatus} from './const';

export const compareDates = (a, b) => (
  Date.parse(a.date) - Date.parse(b.date)
);

export const isAuthorized = (status) => status === AuthorizationStatus.AUTH;
