import TripMenuView from "./view/trip-menu.js";
import TripFilterView from "./view/trip-filter.js";
import {generateWaypoint} from "./mock/waypoint.js";
import {render, RenderPosition, EVENT_COUNT, tripMainElement} from "./utils/render.js";
import TripPresenter from "./presenter/Trip.js";

const waypoints = new Array(EVENT_COUNT).fill().map(generateWaypoint);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

const switchTripViewElement = tripControlsElement.querySelector(`h2`);

render(switchTripViewElement, new TripMenuView(), RenderPosition.AFTER);

render(tripControlsElement, new TripFilterView(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripMainElement, waypoints);

tripPresenter.init(waypoints);
