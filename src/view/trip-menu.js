import AbstractView from "./abstract.js";
// import {MenuItem} from "../const.js";

const createTripMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs trip-tabs"><a class="trip-tabs__btn" href="#">Table</a><a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Stats</a></nav>`;
};

export default class TripMenu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createTripMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.value);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`change`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[value=${menuItem}]`);

    if (item !== null) {
      item.checked = true;
    }
  }
}
