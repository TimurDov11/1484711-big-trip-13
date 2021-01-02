//  import TripInfoView from "./view/trip-info.js";
//  import TripInfoCostView from "./view/trip-info-cost.js";
import TripMenuView from "./view/trip-menu.js";
import TripFilterView from "./view/trip-filter.js";
//  import TripSortView from "./view/trip-sort.js";
//  import TripEventsListView from "./view/trip-events-list.js";
//  import NoTripEventsItemView from "./view/no-trip-events-item.js";
//  import FormNewPointView from "./view/form-new-point.js";
//  import FormEditPointView from "./view/form-edit-point.js";
//  import TripEventsItemView from "./view/trip-events-item.js";
import {generateWaypoint} from "./mock/waypoint.js";
//  import {render, RenderPosition, replace, remove} from "./utils/render.js";
import {render, RenderPosition, EVENT_COUNT, pageBodyElement, tripMainElement} from "./utils/render.js";
import TripPresenter from "./presenter/Trip.js";

//  const EVENT_COUNT = 20;

const waypoints = new Array(EVENT_COUNT).fill().map(generateWaypoint);

/*const renderEventPoint = (tripListElement, waypoint) => {
  const waypointComponent = new TripEventsItemView(waypoint);
  const waypointEditComponent = new FormEditPointView(waypoint);

  const replaceEventPointToForm = () => {
    replace(waypointEditComponent, waypointComponent);
  };

  const replaceFormToEventPoint = () => {
    replace(waypointComponent, waypointEditComponent);
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

  render(tripListElement, waypointComponent, RenderPosition.BEFOREEND);
};*/

//  const pageBodyElement = document.querySelector(`.page-body`);
//  const tripMainElement = pageBodyElement.querySelector(`.trip-main`);

//  const TripInfoComponent = new TripInfoView(waypoints);

//  render(tripMainElement, TripInfoComponent, RenderPosition.AFTERBEGIN);

//  const tripInfoElement = tripMainElement.querySelector(`.trip-info`);

//  const TripInfoCostComponent = new TripInfoCostView(waypoints);

//  render(TripInfoComponent, TripInfoCostComponent, RenderPosition.BEFOREEND);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

const switchTripViewElement = tripControlsElement.querySelector(`h2`);

render(switchTripViewElement, new TripMenuView(), RenderPosition.AFTER);

render(tripControlsElement, new TripFilterView(), RenderPosition.BEFOREEND);

//  const tripEventsElement = pageBodyElement.querySelector(`.trip-events`);
//  const TripEventsListComponent = new TripEventsListView();

/*if (waypoints.length === 0) {
  remove(TripInfoComponent);
  remove(TripInfoCostComponent);
  render(tripEventsElement, new NoTripEventsItemView(), RenderPosition.BEFOREEND);
} else {
  render(tripEventsElement, new TripSortView(), RenderPosition.BEFOREEND);
  render(tripEventsElement, TripEventsListComponent, RenderPosition.BEFOREEND);
}*/

//const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

//  render(tripEventsListElement, new FormNewPointView(waypoints[0]).getElement(), RenderPosition.BEFOREEND);

/*for (let i = 0; i < Math.min(waypoints.length, EVENT_COUNT); i++) {
  renderEventPoint(TripEventsListComponent, waypoints[i]);
}*/

const tripPresenter = new TripPresenter(tripMainElement, waypoints);

tripPresenter.init(waypoints);
