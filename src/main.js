import TripMenuView from "./view/trip-menu.js";
//import TripStatsView from "./view/trip-stats.js";
import {generateWaypoint} from "./mock/waypoint.js";
import {render, RenderPosition} from "./utils/render.js";
import {EVENT_COUNT, tripMainElement, tripEventsElement, MenuItem} from "./const.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import TripPresenter from "./presenter/Trip.js";
import FilterPresenter from "./presenter/Filter.js";
import Api from "./api.js";

const AUTHORIZATION = `Basic d37LFxM8Or6hkLayW74`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip/`;

const waypoints = new Array(EVENT_COUNT).fill().map(generateWaypoint);
const api = new Api(END_POINT, AUTHORIZATION);

/*api.getTasks().then((waypoints) => {
  console.log(waypoints);
});*/

const pointsModel = new PointsModel();
pointsModel.setPoints(waypoints);

const filterModel = new FilterModel();

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

const switchTripViewElement = tripControlsElement.querySelector(`h2`);

const tripMenuComponent = new TripMenuView();

//  const tripStatsComponent = new TripStatsView();

render(switchTripViewElement, tripMenuComponent, RenderPosition.AFTER);
//  render(tripEventsElement, tripStatsComponent, RenderPosition.AFTER);

//  render(tripControlsElement, new TripFilterView(filters, `everything`), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripMainElement, waypoints, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripControlsElement, filterModel, pointsModel);

/*  const handleTripMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      // Скрыть статистику
      tripStatsComponent.hide();
      // Показать маршрут
      TripPresenter.showTrip();
      // Показать форму добавления новой точкимаршрута
      tripPresenter.createTask();
      // Убрать выделение с ADD NEW POINT после сохранения
      break;
    case MenuItem.TABLE:
      // Показать маршрут
      TripPresenter.showTrip();
      // Скрыть статистику
      tripStatsComponent.hide();
      break;
    case MenuItem.STATS:
      // Скрыть маршрут
      TripPresenter.hideTrip();
      // Показать статистику
      tripStatsComponent.show();
      break;
  }
};*/

//  tripMenuComponent.setMenuClickHandler(handleTripMenuClick);

filterPresenter.init();
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createTask();
});
