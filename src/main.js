import TripMenuView from "./view/trip-menu.js";
import TripFilterView from "./view/trip-filter.js";
import {generateWaypoint} from "./mock/waypoint.js";
import {render, RenderPosition} from "./utils/render.js";
import {EVENT_COUNT, tripMainElement} from "./const.js";
import PointsModel from "./model/points.js";
import TripPresenter from "./presenter/Trip.js";

const waypoints = new Array(EVENT_COUNT).fill().map(generateWaypoint);

const pointsModel = new PointsModel();
pointsModel.setTasks(waypoints);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

const switchTripViewElement = tripControlsElement.querySelector(`h2`);

render(switchTripViewElement, new TripMenuView(), RenderPosition.AFTER);

render(tripControlsElement, new TripFilterView(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripMainElement, waypoints, pointsModel);

tripPresenter.init(waypoints);
