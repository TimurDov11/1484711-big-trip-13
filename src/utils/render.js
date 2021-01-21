import Abstract from "../view/abstract.js";
import {getRandomInteger} from "./common.js";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

export const render = (container, child, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
    case RenderPosition.AFTER:
      container.after(child);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};

export const generateDescription = () => {
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

export const generatePhotos = () => {
  const PHOTOS_NUMBER_MIN = 1;
  const PHOTOS_NUMBER_MAX = 5;

  const photos = [];

  let size = getRandomInteger(PHOTOS_NUMBER_MIN, PHOTOS_NUMBER_MAX);

  for (let i = 1; i <= size; i++) {
    photos.push(`http://picsum.photos/248/152?r=${i}`);
  }

  return photos;
};
