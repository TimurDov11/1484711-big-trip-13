import {createElement} from "../utils.js";

const createTripInfoCostTemplate = (waypoints) => {
  const createOffers = waypoints.map((waypoint) => {
    return waypoint.offers;
  });

  let sum = 0;

  for (let offer of createOffers) {
    offer.map((value) => {
      sum = sum + value.price;

      return sum;
    });
  }

  const calculateTotalPrice = waypoints.reduce((accumulator, waypoint) => {
    return accumulator + waypoint.price;
  }, sum);

  return `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${calculateTotalPrice}</span>
    </p>`;
};

export default class TripInfoCost {
  constructor(waypoints) {
    this._waypoints = waypoints;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoCostTemplate(this._waypoints);
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
