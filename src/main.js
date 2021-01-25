import TripMenuView from "./view/trip-menu.js";
import TripStatsView from "./view/trip-stats.js";
import {generateWaypoint} from "./mock/waypoint.js";
import {render, RenderPosition} from "./utils/render.js";
import {EVENT_COUNT, tripMainElement, tripEventsElement, MenuItem} from "./const.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import TripPresenter from "./presenter/Trip.js";
import FilterPresenter from "./presenter/Filter.js";

const waypoints = new Array(EVENT_COUNT).fill().map(generateWaypoint);

const pointsModel = new PointsModel();
pointsModel.setPoints(waypoints);

const filterModel = new FilterModel();

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

const switchTripViewElement = tripControlsElement.querySelector(`h2`);

const tripMenuComponent = new TripMenuView();

render(switchTripViewElement, tripMenuComponent, RenderPosition.AFTER);
render(tripEventsElement, new TripStatsView(), RenderPosition.AFTER);

//  render(tripControlsElement, new TripFilterView(filters, `everything`), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripMainElement, waypoints, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripControlsElement, filterModel, pointsModel);

const handleTripMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      // Скрыть статистику
      // Показать доску
      // Показать форму добавления новой задачи
      // Убрать выделение с ADD NEW POINT после сохранения
      break;
    case MenuItem.TABLE:
      // Показать доску
      // Скрыть статистику
      break;
    case MenuItem.STATS:
      // Скрыть доску
      // Показать статистику
      break;
  }
};

tripMenuComponent.setMenuClickHandler(handleTripMenuClick);

filterPresenter.init();
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createTask();
});
