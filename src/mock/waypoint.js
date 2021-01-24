import dayjs from "dayjs";
import {getRandomInteger} from "../utils/common.js";
import {generateDescription, generatePhotos} from "../utils/render.js";
import {DESTINATION_PLACES} from "../const.js";

const PRICE_MIN = 1;
const PRICE_MAX = 200;

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateType = () => {
  const TYPES = [
    `Taxi`,
    `Bus`,
    `Train`,
    `Ship`,
    `Transport`,
    `Drive`,
    `Flight`,
    `Check-in`,
    `Sightseeing`,
    `Restaurant`
  ];

  const randomIndex = getRandomInteger(0, TYPES.length - 1);

  return TYPES[randomIndex];
};

const generateDestinationPlace = () => {
  const randomIndex = getRandomInteger(0, DESTINATION_PLACES.length - 1);

  return DESTINATION_PLACES[randomIndex];
};

const generateStartTime = () => {
  const minMinutesGap = -6000;
  const maxMinutesGap = 2000;

  const MinutesGap = getRandomInteger(minMinutesGap, maxMinutesGap);

  return dayjs().add(MinutesGap, `minute`).toDate();
};

const generateEndTime = () => {
  const minMinutesGap = 2000;
  const maxMinutesGap = 3000;

  const MinutesGap = getRandomInteger(minMinutesGap, maxMinutesGap);

  return dayjs().add(MinutesGap, `minute`).toDate();
};

const generateOffers = () => {
  const TITLES = [
    `Add luggage`,
    `Switch to comfort`,
    `Add meal`,
    `Choose seats`,
    `Travel by train`,
    `Order Uber`
  ];

  const OFFERS_NUMBER_MIN = 0;
  const OFFERS_NUMBER_MAX = 5;

  const offers = [];

  let size = getRandomInteger(OFFERS_NUMBER_MIN, OFFERS_NUMBER_MAX);

  for (let i = 0; i < size; i++) {
    const randomIndex = getRandomInteger(0, TITLES.length - 1);

    offers.push({
      type: generateType(),
      title: TITLES[randomIndex],
      price: getRandomInteger(PRICE_MIN, PRICE_MAX)
    });
  }

  return offers;
};

export const generateWaypoint = () => {
  const type = generateType();
  const offers = generateOffers().filter((offer) => {
    return offer.type === type;
  }).
  map((offer) => {
    return offer;
  });

  return {
    id: generateId(),
    type,
    destinationPlace: generateDestinationPlace(),
    startTime: generateStartTime(),
    endTime: generateEndTime(),
    price: getRandomInteger(PRICE_MIN, PRICE_MAX),
    offers,
    destinationDescription: {
      description: generateDescription(),
      photos: generatePhotos()
    },
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
