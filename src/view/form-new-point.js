import SmartView from "./smart.js";
import dayjs from "dayjs";
import {generateDescription, generatePhotos} from "../utils/render.js";
import {TYPES} from "../const.js";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const BLANK_POINT = {
  type: TYPES[0],
  destinationPlace: ``,
  startTime: ``,
  endTime: ``,
  price: ``,
  offers: ``,
  destinationDescription: {
    description: generateDescription(),
    photos: generatePhotos()
  },
  isFavorite: false
};

const createEventOfferTemplate = (offers, isOffers) => {
  if (isOffers) {
    return ``;
  } else {
    const fragment = [];

    for (let i = 0; i < offers.length; i++) {
      fragment.push(`<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage">
        <label class="event__offer-label" for="event-offer-luggage-1">
          <span class="event__offer-title">${offers[i].title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offers[i].price}</span>
        </label>
      </div>`);
    }

    return fragment.join(``);
  }
};

const createEventOfferSectionTemplate = (eventOfferTemplate) => {
  if (eventOfferTemplate === ``) {
    return ``;
  } else {
    return `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${eventOfferTemplate}
          </div>
        </section>`;
  }
};

const createEventDescriptionTemplate = (destinationDescription, isDestinationDescriptionDescription) => {
  if (isDestinationDescriptionDescription) {
    return ``;
  } else {
    const fragment = [];

    for (let i = 0; i < destinationDescription.description.length; i++) {
      fragment.push(`${destinationDescription.description[i]}`);
    }

    return fragment.join(` `);
  }
};

const createEventPhotosTemplate = (destinationDescription, isDestinationDescriptionPhotos) => {
  if (isDestinationDescriptionPhotos) {
    return ``;
  } else {
    const fragment = [];

    for (let i = 0; i < destinationDescription.photos.length; i++) {
      fragment.push(`<img class="event__photo" src="${destinationDescription.photos[i]}" alt="Event photo">`);
    }

    return fragment.join(``);
  }
};

const createEventDestinationDescriptionSectionTemplate = (eventDescriptionTemplate, eventPhotosTemplate) => {
  if (eventDescriptionTemplate === ``) {
    return ``;
  } else {
    return `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${eventDescriptionTemplate}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${eventPhotosTemplate}
        </div>
      </div>
    </section>`;
  }
};

const createFormNewPointTemplate = (data) => {
  const {type, destinationPlace, startTime, endTime, price, offers, destinationDescription, isOffers, isDestinationDescriptionDescription, isDestinationDescriptionPhotos} = data;

  const startTimeDateTimeHuman = dayjs(startTime).format(`DD/MM/YY HH:mm`);
  const endTimeDateTimeHuman = dayjs(endTime).format(`DD/MM/YY HH:mm`);

  const eventOfferTemplate = createEventOfferTemplate(offers, isOffers);

  const eventOfferSectionTemplate = createEventOfferSectionTemplate(eventOfferTemplate);

  const eventDescriptionTemplate = createEventDescriptionTemplate(destinationDescription, isDestinationDescriptionDescription);

  const eventPhotosTemplate = createEventPhotosTemplate(destinationDescription, isDestinationDescriptionPhotos);

  const eventDestinationDescriptionSectionTemplate = createEventDestinationDescriptionSectionTemplate(eventDescriptionTemplate, eventPhotosTemplate);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationPlace}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTimeDateTimeHuman}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTimeDateTimeHuman}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        ${eventOfferSectionTemplate}

        ${eventDestinationDescriptionSectionTemplate}
      </section>
    </form>
  </li>`;
};

export default class FormNewPoint extends SmartView {
  constructor(waypoint = BLANK_POINT) {
    super();
    this._data = FormNewPoint.parseWaypointToData(waypoint);
    this._startDatepicker = null;
    this._endDatepicker = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
    this._typeToggleHandler = this._typeToggleHandler.bind(this);
    this._destinationPlaceToggleHandler = this._destinationPlaceToggleHandler.bind(this);
    this._eventPriceInputHandler = this._eventPriceInputHandler.bind(this);
    this._startTimeChangeHandler = this._startTimeChangeHandler.bind(this);
    this._endTimeChangeHandler = this._endTimeChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatepicker();
  }

  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  reset(waypoint) {
    this.updateData(
        FormNewPoint.parseWaypointToData(waypoint)
    );
  }

  getTemplate() {
    return createFormNewPointTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditClickHandler(this._callback.editClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setStartDatepicker() {
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }


    this._startDatepicker = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          enableTime: true,
          dateFormat: `d/m/y H:i`,
          //  time_24hr: true,
          defaultDate: this._data.startTime,
          onChange: this._startTimeChangeHandler
        }
    );
  }

  _setEndDatepicker() {
    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }


    this._endDatepicker = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          enableTime: true,
          dateFormat: `d/m/y H:i`,
          //  time_24hr: true,
          defaultDate: this._data.endTime,
          minDate: this._data.startTime,
          onChange: this._endTimeChangeHandler
        }
    );
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__type-group`)
      .addEventListener(`click`, this._typeToggleHandler);
    this.getElement()
      .querySelector(`#event-destination-1`)
      .addEventListener(`change`, this._destinationPlaceToggleHandler);
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`input`, this._eventPriceInputHandler);
  }

  _typeToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.innerText
    });
  }

  _destinationPlaceToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      destinationPlace: evt.target.value,
      destinationDescription: {
        description: generateDescription(),
        photos: generatePhotos()
      }
    });
  }

  _eventPriceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value
    }, true);
  }

  _startTimeChangeHandler([userDate]) {
    this.updateData({
      startTime: dayjs(userDate).format(`DD/MM/YY HH:mm`)
      //  startTime: dayjs(userDate).hour(23).minute(59).second(59).toDate()
      //  dayjs(startTime).format(`DD/MM/YY HH:mm`)
    }, true);
  }

  _endTimeChangeHandler([userDate]) {
    this.updateData({
      endTime: dayjs(userDate).toDate()
    }, true);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(FormNewPoint.parseDataToWaypoint(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    //  this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }

  removeEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).removeEventListener(`click`, this._editClickHandler);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(FormNewPoint.parseDataToWaypoint(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  static parseWaypointToData(waypoint) {
    return Object.assign(
        {},
        waypoint,
        {
          destinationDescription: {
            description: generateDescription(),
            photos: generatePhotos()
          },
          isOffers: waypoint.offers.length === 0,
          isDestinationDescriptionDescription: waypoint.destinationDescription.description.length,
          isDestinationDescriptionPhotos: waypoint.destinationDescription.photos.length
        }
    );
  }

  static parseDataToWaypoint(data) {
    data = Object.assign({}, data);

    delete data.isOffers;
    delete data.isDestinationDescriptionDescription;
    delete data.isDestinationDescriptionPhotos;

    return data;
  }
}
