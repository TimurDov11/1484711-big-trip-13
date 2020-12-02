import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTripInfoCostTemplate} from "./view/trip-info-cost.js";
import {createTripMenuTemplate} from "./view/trip-menu.js";
import {createTripFilterTemplate} from "./view/trip-filter.js";
import {createTripSortTemplate} from "./view/trip-sort.js";
import {createTripEventsListTemplate} from "./view/trip-events-list.js";
import {createFormNewPointTemplate} from "./view/form-new-point.js";
import {createFormEditPointTemplate} from "./view/form-edit-point.js";
import {createTripEventsItemTemplate} from "./view/trip-events-item.js";
import {generateWaypoint} from "./mock/waypoint.js";

const EVENT_COUNT = 20;

const waypoints = new Array(EVENT_COUNT).fill().map(generateWaypoint);

//  console.log(waypoints);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const pageBodyElement = document.querySelector(`.page-body`);
const tripMainElement = pageBodyElement.querySelector(`.trip-main`);

render(tripMainElement, createTripInfoTemplate(), `afterbegin`);

const tripInfoElement = tripMainElement.querySelector(`.trip-info`);

render(tripInfoElement, createTripInfoCostTemplate(), `beforeend`);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

const switchTripViewElement = tripControlsElement.querySelector(`h2`);

render(switchTripViewElement, createTripMenuTemplate(), `afterend`);
render(tripControlsElement, createTripFilterTemplate(), `beforeend`);

const tripEventsElement = pageBodyElement.querySelector(`.trip-events`);

render(tripEventsElement, createTripSortTemplate(), `beforeend`);
render(tripEventsElement, createTripEventsListTemplate(), `beforeend`);

const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

render(tripEventsListElement, createFormNewPointTemplate(), `beforeend`);
render(tripEventsListElement, createFormEditPointTemplate(waypoints[0]), `beforeend`);

for (let i = 0; i < EVENT_COUNT; i++) {
  render(tripEventsListElement, createTripEventsItemTemplate(waypoints[i]), `beforeend`);
}
