import AbstractView from "./abstract.js";

const createNoTripEventsItemTemplate = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};

export default class NoTripEventsItem extends AbstractView {
  getTemplate() {
    return createNoTripEventsItemTemplate();
  }
}
