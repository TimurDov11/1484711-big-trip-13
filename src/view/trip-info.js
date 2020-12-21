import dayjs from "dayjs";
import {createElement} from "../utils.js";

const createTripInfoTemplate = (waypoints) => {
  const createDestinationPlaces = waypoints.map((waypoint) => {
    return waypoint.destinationPlace;
  });

  const uniqDestinationPlaces = Array.from(new Set(createDestinationPlaces));

  const firstDestinationPlace = uniqDestinationPlaces[0];
  const lastDestinationPlace = uniqDestinationPlaces[uniqDestinationPlaces.length - 1];
  const middleDestinationPlace = uniqDestinationPlaces.length > 3
    ? `...`
    : uniqDestinationPlaces[1];

  const createStartDates = waypoints.
    map(function (waypoint) {
      return waypoint.startTime;
    }).
    sort();

  const firstDate = dayjs(createStartDates[0]).format(`MMM DD`);

  const createlastDates = waypoints.
    map(function (waypoint) {
      return waypoint.endTime;
    }).
    sort();

  const lastDate = dayjs(createlastDates[createlastDates.length - 1]).format(`DD`);

  return `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${firstDestinationPlace} &mdash; ${middleDestinationPlace} &mdash; ${lastDestinationPlace}</h1>

        <p class="trip-info__dates">${firstDate}&nbsp;&mdash;&nbsp;${lastDate}</p>
      </div>
    </section>`;
};

export default class TripInfo {
  constructor(waypoints) {
    this._waypoints = waypoints;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._waypoints);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
