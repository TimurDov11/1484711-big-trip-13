import TripInfoView from "../view/trip-info.js";
import TripInfoCostView from "../view/trip-info-cost.js";
import TripSortView from "../view/trip-sort.js";
import TripEventsListView from "../view/trip-events-list.js";
import NoTripEventsItemView from "../view/no-trip-events-item.js";
import {render, RenderPosition, remove, EVENT_COUNT, tripEventsElement} from "../utils/render.js";
import {updateItem} from "../utils/common.js";
import PointPresenter from "./Point.js";

export default class Trip {
  constructor(tripContainer, tripPoints) {
    this._tripContainer = tripContainer;
    this._pointPresenter = {};

    this._tripInfoComponent = new TripInfoView(tripPoints);
    this._tripInfoCostComponent = new TripInfoCostView(tripPoints);
    this._noTripEventsItemComponent = new NoTripEventsItemView();
    this._tripSortComponent = new TripSortView();
    this._tripEventsListComponent = new TripEventsListView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();

    render(this._tripContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(this._tripInfoComponent, this._tripInfoCostComponent, RenderPosition.BEFOREEND);

    this._renderTrip();
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _renderEventPoint(waypoint) {
    const pointPresenter = new PointPresenter(this._tripEventsListComponent, this._handlePointChange, this._handleModeChange);

    pointPresenter.init(waypoint);
    this._pointPresenter[waypoint.id] = pointPresenter;
  }

  _clearEventPoints() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
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
