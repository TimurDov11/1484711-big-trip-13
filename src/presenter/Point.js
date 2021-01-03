import TripEventsItemView from "../view/trip-events-item.js";
import FormEditPointView from "../view/form-edit-point.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";

export default class Point {
  constructor(tripEventsListContainer) {
    this._tripEventsListContainer = tripEventsListContainer;

    this._waypointComponent = null;
    this._waypointEditComponent = null;

    this._onEventRollupBtnDownClick = this._onEventRollupBtnDownClick.bind(this);
    this._onEventRollupBtnUpClick = this._onEventRollupBtnUpClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(waypoint) {
    this._waypoint = waypoint;

    const prevWaypointComponent = this._waypointComponent;
    const prevWaypointEditComponent = this._waypointEditComponent;

    this._waypointComponent = new TripEventsItemView(waypoint);
    this._waypointEditComponent = new FormEditPointView(waypoint);

    this._waypointComponent.setEditClickHandler(this._onEventRollupBtnDownClick);
    this._waypointEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    if (prevWaypointComponent === null || prevWaypointEditComponent === null) {
      render(this._tripEventsListContainer, this._waypointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._tripEventsListContainer.getElement().contains(prevWaypointComponent.getElement())) {
      replace(this._waypointComponent, prevWaypointComponent);
    }

    if (this._tripEventsListContainer.getElement().contains(prevWaypointEditComponent.getElement())) {
      replace(this._waypointEditComponent, prevWaypointEditComponent);
    }

    remove(prevWaypointComponent);
    remove(prevWaypointEditComponent);
  }

  destroy() {
    remove(this._waypointComponent);
    remove(this._waypointEditComponent);
  }

  _replaceEventPointToForm() {
    replace(this._waypointEditComponent, this._waypointComponent);
  }

  _replaceFormToEventPoint() {
    replace(this._waypointComponent, this._waypointEditComponent);
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();

      this._replaceFormToEventPoint();
      this._waypointComponent.setEditClickHandler(this._onEventRollupBtnDownClick);
      this._waypointEditComponent.removeEditClickHandler(this._onEventRollupBtnUpClick);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _onEventRollupBtnDownClick() {
    this._replaceEventPointToForm();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEventRollupBtnDownClick() {
    this._replaceEventPointToForm();
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._waypointEditComponent.setEditClickHandler(this._onEventRollupBtnUpClick);
    this._waypointComponent.removeEditClickHandler(this._onEventRollupBtnDownClick);
  }

  _onEventRollupBtnUpClick() {
    this._replaceFormToEventPoint();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._waypointComponent.setEditClickHandler(this._onEventRollupBtnDownClick);
    this._waypointEditComponent.removeEditClickHandler(this._onEventRollupBtnUpClick);
  }

  _handleFormSubmit() {
    this._replaceFormToEventPoint();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._waypointEditComponent.removeEditClickHandler(this._onEventRollupBtnUpClick);
    this._waypointComponent.setEditClickHandler(this._onEventRollupBtnDownClick);
  }
}
