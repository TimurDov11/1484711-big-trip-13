import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTripInfoCostTemplate} from "./view/trip-info-cost.js";
import SiteMenuView from "./view/trip-menu.js";
import TripFilterView from "./view/trip-filter.js";
import TripSortView from "./view/trip-sort.js";
import TripEventsListView from "./view/trip-events-list.js";
import {createFormNewPointTemplate} from "./view/form-new-point.js";
import {createFormEditPointTemplate} from "./view/form-edit-point.js";
import {createTripEventsItemTemplate} from "./view/trip-events-item.js";
import {generateWaypoint} from "./mock/waypoint.js";
import {renderTemplate, renderElement, RenderPosition} from "./utils.js";

const EVENT_COUNT = 20;

const waypoints = new Array(EVENT_COUNT).fill().map(generateWaypoint);

const pageBodyElement = document.querySelector(`.page-body`);
const tripMainElement = pageBodyElement.querySelector(`.trip-main`);

renderTemplate(tripMainElement, createTripInfoTemplate(waypoints), `afterbegin`);

const tripInfoElement = tripMainElement.querySelector(`.trip-info`);

renderTemplate(tripInfoElement, createTripInfoCostTemplate(waypoints), `beforeend`);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

const switchTripViewElement = tripControlsElement.querySelector(`h2`);

renderElement(switchTripViewElement, new SiteMenuView().getElement(), RenderPosition.AFTER);

renderElement(tripControlsElement, new TripFilterView().getElement(), RenderPosition.BEFOREEND);

const tripEventsElement = pageBodyElement.querySelector(`.trip-events`);

renderElement(tripEventsElement, new TripSortView().getElement(), RenderPosition.BEFOREEND);
renderElement(tripEventsElement, new TripEventsListView().getElement(), RenderPosition.BEFOREEND);

const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

renderTemplate(tripEventsListElement, createFormNewPointTemplate(waypoints[0]), `beforeend`);
renderTemplate(tripEventsListElement, createFormEditPointTemplate(waypoints[0]), `beforeend`);

for (let i = 1; i < EVENT_COUNT; i++) {
  renderTemplate(tripEventsListElement, createTripEventsItemTemplate(waypoints[i]), `beforeend`);
}
