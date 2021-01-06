import dayjs from "dayjs";
import {getRandomInteger} from "../utils/common.js";

const PRICE_MIN = 1;
const PRICE_MAX = 200;

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

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
  const DESTINATION_PLACES = [
    `Amsterdam`,
    `Chamonix`,
    `Geneva`,
    `Surgut`
  ];

  const randomIndex = getRandomInteger(0, DESTINATION_PLACES.length - 1);

  return DESTINATION_PLACES[randomIndex];
};

const generateStartTime = () => {
  const minMinutesGap = 30;
  const maxMinutesGap = 6000;

  const MinutesGap = getRandomInteger(minMinutesGap, maxMinutesGap);

  return dayjs().add(MinutesGap, `minute`).toDate();
};

const generateEndTime = () => {
  const minMinutesGap = 7000;
  const maxMinutesGap = 16000;

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

const generateDescription = () => {
  const DESCRIPTIONS = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];

  const DESCRIPTIONS_NUMBER_MIN = 1;
  const DESCRIPTIONS_NUMBER_MAX = 5;

  const descriptions = [];
  let temp = DESCRIPTIONS.slice();
  let size = getRandomInteger(DESCRIPTIONS_NUMBER_MIN, DESCRIPTIONS_NUMBER_MAX);

  for (let i = 1; i <= size; i++) {
    const index = getRandomInteger(0, temp.length - 1);
    descriptions.push(temp[index]);
    temp.splice(index, 1);
  }

  return descriptions;
};

const generatePhotos = () => {
  const PHOTOS_NUMBER_MIN = 1;
  const PHOTOS_NUMBER_MAX = 5;

  const photos = [];

  let size = getRandomInteger(PHOTOS_NUMBER_MIN, PHOTOS_NUMBER_MAX);

  for (let i = 1; i <= size; i++) {
    photos.push(`http://picsum.photos/248/152?r=${i}`);
  }

  return photos;
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
