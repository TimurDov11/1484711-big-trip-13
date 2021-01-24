import FormNewPointView from "../view/form-new-point.js";
import {generateId} from "../mock/waypoint.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";

export default class PointNew {
  constructor(tripEventsListContainer, changeData) {
    this._tripEventsListContainer = tripEventsListContainer;
    this._changeData = changeData;

    this._waypointNewComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init() {
    if (this._waypointNewComponent !== null) {
      return;
    }

    this._waypointNewComponent = new FormNewPointView();
    this._waypointNewComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._waypointNewComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._tripEventsListContainer, this._waypointNewComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  destroy() {
    if (this._waypointNewComponent === null) {
      return;
    }

    remove(this._waypointNewComponent);
    this._waypointNewComponent = null;

    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _handleFormSubmit(waypoint) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        // Пока у нас нет сервера, который бы после сохранения
        // выдывал честный id задачи, нам нужно позаботиться об этом самим
        Object.assign({id: generateId()}, waypoint)
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
