import {createElement} from "../utils.js";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
dayjs.extend(duration);
dayjs.extend(utc);

const createTripEventsItemTemplate = (waypoint) => {
  const {type, destinationPlace, startTime, endTime, price, offers, isFavorite} = waypoint;

  const startTimeDateHuman = dayjs(startTime).format(`MMM DD`);
  const startTimeDateMachinery = dayjs(startTime).format(`YYYY-MM-DD`);
  const startTimeHuman = dayjs(startTime).format(`HH:mm`);
  const startTimeMachinery = dayjs(startTime).format(`YYYY-MM-DDTHH:mm`);
  const endTimeHuman = dayjs(endTime).format(`HH:mm`);
  const endTimeMachinery = dayjs(endTime).format(`YYYY-MM-DDTHH:mm`);

  const difference = dayjs.duration(dayjs(endTime).diff(dayjs(startTime))).asMilliseconds();

  const createDifference = () => {
    if (difference < dayjs.duration(1, `hours`).asMilliseconds()) {
      return dayjs(difference).utc().format(`mm[M]`);
    } else if (difference < dayjs.duration(1, `days`).asMilliseconds()) {
      return dayjs(difference).utc().format(`HH[H] mm[M]`);
    } else {
      return dayjs(difference).utc().format(`DD[D] HH[H] mm[M]`);
    }
  };

  const favoriteClassName = isFavorite
    ? `event__favorite-btn--active`
    : ``;

  const createEventOfferTemplate = () => {
    if (offers.length === 0) {
      return ``;
    } else {
      const fragment = [];

      for (let i = 0; i < offers.length; i++) {
        fragment.push(`<li class="event__offer">
            <span class="event__offer-title">${offers[i].title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offers[i].price}</span>
          </li>`);
      }

      return fragment.join(``);
    }
  };

  return `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${startTimeDateMachinery}">${startTimeDateHuman}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destinationPlace}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startTimeMachinery}">${startTimeHuman}</time>
            &mdash;
            <time class="event__end-time" datetime="${endTimeMachinery}">${endTimeHuman}</time>
          </p>
          <p class="event__duration">${createDifference()}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createEventOfferTemplate()}
        </ul>
        <button class="event__favorite-btn ${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
};

export default class TripEventsItem {
  constructor(waypoint) {
    this._waypoint = waypoint;
    this._element = null;
  }

  getTemplate() {
    return createTripEventsItemTemplate(this._waypoint);
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
