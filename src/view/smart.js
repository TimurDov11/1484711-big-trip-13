import Abstract from "./abstract";

export default class Smart extends Abstract {
  constructor() {
    super();
    this._waypoint = {};
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._waypoint = Object.assign(
        {},
        this._waypoint,
        update
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: resetHandlers`);
  }
}
