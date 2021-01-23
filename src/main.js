import TripMenuView from "./view/trip-menu.js";
import {generateWaypoint} from "./mock/waypoint.js";
import {render, RenderPosition} from "./utils/render.js";
import {EVENT_COUNT, tripMainElement} from "./const.js";
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

render(switchTripViewElement, new TripMenuView(), RenderPosition.AFTER);

//  render(tripControlsElement, new TripFilterView(filters, `everything`), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripMainElement, waypoints, pointsModel);
const filterPresenter = new FilterPresenter(tripControlsElement, filterModel, pointsModel);

filterPresenter.init();
tripPresenter.init();
