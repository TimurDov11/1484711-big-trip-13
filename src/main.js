import TripInfoView from "./view/trip-info.js";
import TripInfoCostView from "./view/trip-info-cost.js";
import SiteMenuView from "./view/trip-menu.js";
import TripFilterView from "./view/trip-filter.js";
import TripSortView from "./view/trip-sort.js";
import TripEventsListView from "./view/trip-events-list.js";
import NoTripEventsItemView from "./view/no-trip-events-item.js";
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

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();

      replaceFormToEventPoint();
      waypointComponent.setEditClickHandler(onEventRollupBtnDownClick);
      waypointEditComponent.removeEditClickHandler(onEventRollupBtnUpClick);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onEventRollupBtnDownClick = () =>{
    replaceEventPointToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
    waypointEditComponent.setEditClickHandler(onEventRollupBtnUpClick);
    waypointComponent.removeEditClickHandler(onEventRollupBtnDownClick);
  };

  const onEventRollupBtnUpClick = () =>{
    replaceFormToEventPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
    waypointComponent.setEditClickHandler(onEventRollupBtnDownClick);
    waypointEditComponent.removeEditClickHandler(onEventRollupBtnUpClick);
  };

  waypointComponent.setEditClickHandler(onEventRollupBtnDownClick);

  waypointEditComponent.setFormSubmitHandler(() => {
    replaceFormToEventPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
    waypointEditComponent.removeEditClickHandler(onEventRollupBtnUpClick);
    waypointComponent.setEditClickHandler(onEventRollupBtnDownClick);
  });

  render(tripListElement, waypointComponent.getElement(), RenderPosition.BEFOREEND);
};

const pageBodyElement = document.querySelector(`.page-body`);
const tripMainElement = pageBodyElement.querySelector(`.trip-main`);

const TripInfoComponent = new TripInfoView(waypoints);

render(tripMainElement, TripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);

const tripInfoElement = tripMainElement.querySelector(`.trip-info`);

const TripInfoCostComponent = new TripInfoCostView(waypoints);

render(tripInfoElement, TripInfoCostComponent.getElement(), RenderPosition.BEFOREEND);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

const switchTripViewElement = tripControlsElement.querySelector(`h2`);

render(switchTripViewElement, new SiteMenuView().getElement(), RenderPosition.AFTER);

render(tripControlsElement, new TripFilterView().getElement(), RenderPosition.BEFOREEND);

const tripEventsElement = pageBodyElement.querySelector(`.trip-events`);

if (waypoints.length === 0) {
  TripInfoComponent.getElement().remove();
  TripInfoComponent.removeElement();
  TripInfoCostComponent.getElement().remove();
  TripInfoCostComponent.removeElement();
  render(tripEventsElement, new NoTripEventsItemView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(tripEventsElement, new TripSortView().getElement(), RenderPosition.BEFOREEND);
  render(tripEventsElement, new TripEventsListView().getElement(), RenderPosition.BEFOREEND);
}

const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

//  render(tripEventsListElement, new FormNewPointView(waypoints[0]).getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < Math.min(waypoints.length, EVENT_COUNT); i++) {
  renderEventPoint(tripEventsListElement, waypoints[i]);
}
