export const EVENT_COUNT = 20;

export const pageBodyElement = document.querySelector(`.page-body`);

export const tripMainElement = pageBodyElement.querySelector(`.trip-main`);

export const tripEventsElement = pageBodyElement.querySelector(`.trip-events`);

export const SortType = {
  DEFAULT: `default`,
  TIME: `time`,
  PRICE: `price`
};

export const UserAction = {
  EDIT_POINT: `EDIT_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};
