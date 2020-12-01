import dayjs from "dayjs";

export const createTripEventsItemTemplate = (waypoint) => {
  const {type, destinationPlace, startTime, endTime, price, isFavorite} = waypoint;

  const startTimeDateHuman = dayjs(startTime).format(`MMM DD`);
  const startTimeDateMachinery = dayjs(startTime).format(`YYYY-MM-DD`);
  const startTimeHuman = dayjs(startTime).format(`HH:mm`);
  const startTimeMachinery = dayjs(startTime).format(`YYYY-MM-DDTHH:mm`);
  const endTimeHuman = dayjs(endTime).format(`HH:mm`);
  const endTimeMachinery = dayjs(endTime).format(`YYYY-MM-DDTHH:mm`);
  const duration = dayjs(endTime).diff(dayjs(startTime));

  const favoriteClassName = isFavorite
    ? `event__favorite-btn--active`
    : ``;

  //  const selectedOffersList = document.querySelector(`.event__selected-offers`);

  //  console.log(selectedOffersList);
  //  selectedOffersList.textContent = ``;

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
          <p class="event__duration">${duration}M</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title">Order Uber</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">20</span>
          </li>
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
