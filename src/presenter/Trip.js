import TripInfoView from "../view/trip-info.js";
import TripInfoCostView from "../view/trip-info-cost.js";
import TripSortView from "../view/trip-sort.js";
import TripEventsListView from "../view/trip-events-list.js";
import NoTripEventsItemView from "../view/no-trip-events-item.js";
import {render, RenderPosition, remove, EVENT_COUNT, tripEventsElement} from "../utils/render.js";
import PointPresenter from "./Point.js";

export default class Trip {
  constructor(tripContainer, tripPoints) {
    this._tripContainer = tripContainer;

    this._tripInfoComponent = new TripInfoView(tripPoints);
    this._tripInfoCostComponent = new TripInfoCostView(tripPoints);
    this._noTripEventsItemComponent = new NoTripEventsItemView();
    this._tripSortComponent = new TripSortView();
    this._tripEventsListComponent = new TripEventsListView();
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();

    render(this._tripContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(this._tripInfoComponent, this._tripInfoCostComponent, RenderPosition.BEFOREEND);

    this._renderTrip();
  }

  _renderEventPoint(waypoint) {
    const pointPresenter = new PointPresenter(this._tripEventsListComponent);

    pointPresenter.init(waypoint);
  }

  _renderEventPoints() {
    for (let i = 0; i < Math.min(this._tripPoints.length, EVENT_COUNT); i++) {
      this._renderEventPoint(this._tripPoints[i]);
    }
  }

  _renderNoEventPoints() {
    render(tripEventsElement, this._noTripEventsItemComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    if (this._tripPoints.length === 0) {
      remove(this._tripInfoComponent);
      remove(this._tripInfoCostComponent);
      this._renderNoEventPoints();
    } else {
      render(tripEventsElement, this._tripSortComponent, RenderPosition.BEFOREEND);
      render(tripEventsElement, this._tripEventsListComponent, RenderPosition.BEFOREEND);
    }

    this._renderEventPoints();
  }
}
