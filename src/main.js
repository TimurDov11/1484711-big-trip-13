import TripInfoView from "./view/trip-info.js";
import TripInfoCostView from "./view/trip-info-cost.js";
import SiteMenuView from "./view/trip-menu.js";
import TripFilterView from "./view/trip-filter.js";
import TripSortView from "./view/trip-sort.js";
import TripEventsListView from "./view/trip-events-list.js";
//  import FormNewPointView from "./view/form-new-point.js";
import FormEditPointView from "./view/form-edit-point.js";
import TripEventsItemView from "./view/trip-events-item.js";
import {generateWaypoint} from "./mock/waypoint.js";
import {render, RenderPosition} from "./utils.js";

const EVENT_COUNT = 20;

const waypoints = new Array(EVENT_COUNT).fill().map(generateWaypoint);

const renderEventPoint = (tripListElement, waypoint) => {
  const waypointComponent = new TripEventsItemView(waypoint);
  const waypointEditComponent = new FormEditPointView(waypoint);

  const replaceEventPointToForm = () => {
    tripListElement.replaceChild(waypointEditComponent.getElement(), waypointComponent.getElement());
  };

  const replaceFormToEventPoint = () => {
    tripListElement.replaceChild(waypointComponent.getElement(), waypointEditComponent.getElement());
  };

  waypointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceEventPointToForm();
  });

  waypointEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToEventPoint();
  });

  render(tripListElement, waypointComponent.getElement(), RenderPosition.BEFOREEND);
};

const pageBodyElement = document.querySelector(`.page-body`);
const tripMainElement = pageBodyElement.querySelector(`.trip-main`);

render(tripMainElement, new TripInfoView(waypoints).getElement(), RenderPosition.AFTERBEGIN);

const tripInfoElement = tripMainElement.querySelector(`.trip-info`);

render(tripInfoElement, new TripInfoCostView(waypoints).getElement(), RenderPosition.BEFOREEND);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

const switchTripViewElement = tripControlsElement.querySelector(`h2`);

render(switchTripViewElement, new SiteMenuView().getElement(), RenderPosition.AFTER);

render(tripControlsElement, new TripFilterView().getElement(), RenderPosition.BEFOREEND);

const tripEventsElement = pageBodyElement.querySelector(`.trip-events`);

render(tripEventsElement, new TripSortView().getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new TripEventsListView().getElement(), RenderPosition.BEFOREEND);

const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

//  render(tripEventsListElement, new FormNewPointView(waypoints[0]).getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < EVENT_COUNT; i++) {
  renderEventPoint(tripEventsListElement, waypoints[i]);
}
