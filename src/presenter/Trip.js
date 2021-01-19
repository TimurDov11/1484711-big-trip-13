import TripInfoView from "../view/trip-info.js";
import TripInfoCostView from "../view/trip-info-cost.js";
import TripSortView from "../view/trip-sort.js";
import TripEventsListView from "../view/trip-events-list.js";
import NoTripEventsItemView from "../view/no-trip-events-item.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {EVENT_COUNT, tripEventsElement} from "../const.js";
import PointPresenter from "./Point.js";
import {sortEventPointDay, sortEventPointPrice, sortEventPointTime} from "../utils/event-point.js";
import {SortType, UpdateType, UserAction} from "../const.js";

export default class Trip {
  constructor(tripContainer, tripPoints, pointsModel) {
    this._pointsModel = pointsModel;
    this._tripContainer = tripContainer;
    this._pointPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._tripInfoComponent = new TripInfoView(tripPoints);
    this._tripInfoCostComponent = new TripInfoCostView(tripPoints);
    this._noTripEventsItemComponent = new NoTripEventsItemView();
    this._tripSortComponent = new TripSortView();
    this._tripEventsListComponent = new TripEventsListView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._tripContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(this._tripInfoComponent, this._tripInfoCostComponent, RenderPosition.BEFOREEND);

    this._renderTrip();
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SortType.TIME:
        this._pointsModel.getPoints().slice().sort(sortEventPointTime);
      case SortType.PRICE:
        this._pointsModel.getPoints().slice().sort(sortEventPointPrice);
    }

    return this._pointsModel.getPoints();
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.EDIT_POINT:
        this._pointsModel.editPoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть точки маршрута (например, когда поменялась цена)
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  }

  _renderEventPoint(waypoint) {
    const pointPresenter = new PointPresenter(this._tripEventsListComponent, this._handleViewAction, this._handleModeChange);

    pointPresenter.init(waypoint);
    this._pointPresenter[waypoint.id] = pointPresenter;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    this._clearEventPoints();

    render(tripEventsElement, this._tripEventsListComponent, RenderPosition.BEFOREEND);
    this._renderEventPoints();
  }

  _renderSort() {
    render(tripEventsElement, this._tripSortComponent, RenderPosition.BEFOREEND);
    this._tripSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _clearEventPoints() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _renderEventPoints(waypoints) {
    waypoints.forEach((waypoint) => this._renderEventPoint(waypoint));
  }

  _renderNoEventPoints() {
    render(tripEventsElement, this._noTripEventsItemComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    if (this._getPoints().length === 0) {
      remove(this._tripInfoComponent);
      remove(this._tripInfoCostComponent);
      this._renderNoEventPoints();
    } else {
      this._renderSort();
      render(tripEventsElement, this._tripEventsListComponent, RenderPosition.BEFOREEND);
      this._renderEventPoints(this._getPoints().slice().sort(sortEventPointDay));
    }
  }
}
