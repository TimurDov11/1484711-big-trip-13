import dayjs from "dayjs";

const PRICE_MIN = 1;
const PRICE_MAX = 200;

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

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
    `Geneva`
  ];

  const randomIndex = getRandomInteger(0, DESTINATION_PLACES.length - 1);

  return DESTINATION_PLACES[randomIndex];
};

const generateStartTime = () => {
  return dayjs().toDate();
};

const generateEndTime = () => {
  const minMinutesGap = 30;
  const maxMinutesGap = 600;

  const MinutesGap = getRandomInteger(minMinutesGap, maxMinutesGap);

  return dayjs().add(MinutesGap, `minute`).toDate();
};

const generateOffer = () => {
  const TITLES = [
    `Add luggage`,
    `Chamonix`,
    `Geneva`
  ];

  return {
    type,
    title: false,
    price: false
  };
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
    const index = getRandomInteger(0, temp.length);
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

  return {
    type,
    destinationPlace: generateDestinationPlace(),
    startTime: generateStartTime(),
    endTime: generateEndTime(),
    price: getRandomInteger(PRICE_MIN, PRICE_MAX),
    offers: {
      type,
      title: false,
      price: false
    },
    destinationDescription: {
      description: generateDescription(),
      photos: generatePhotos()
    },
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};

console.log(generateWaypoint());
