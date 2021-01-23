import dayjs from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter);

export const sortEventPointDay = (pointA, pointB) => {
  return dayjs(pointA.startTime).diff(dayjs(pointB.startTime));
};

export const sortEventPointTime = (pointA, pointB) => {
  const differencePointA = dayjs.duration(dayjs(pointA.endTime).diff(dayjs(pointA.startTime))).asMilliseconds();
  const differencePointB = dayjs.duration(dayjs(pointB.endTime).diff(dayjs(pointB.startTime))).asMilliseconds();

  return differencePointB - differencePointA;
};

export const sortEventPointPrice = (pointA, pointB) => {
  if (pointA.price > pointB.price) {
    return -1;
  }
  if (pointA.price < pointB.price) {
    return 1;
  }

  return 0;
};

export const isDatesEqual = (dateA, dateB) => {
  return dayjs(dateA).isSame(dateB, `D`);
};

export const isPricesEqual = (priceA, priceB) => {
  return priceA === priceB ? true : false;
};

export const isPointFuture = (date) => {
  return dayjs(date).isSameOrAfter(dayjs(), `D`);
};

export const isPointPast = (date) => {
  return dayjs(date).isBefore(dayjs(), `D`);
};
