import TripInfoView from "../view/trip-info.js";
import TripInfoCostView from "../view/trip-info-cost.js";
//  import SiteMenuView from "../view/trip-menu.js";
//  import TripFilterView from "../view/trip-filter.js";
import TripSortView from "../view/trip-sort.js";
import TripEventsListView from "../view/trip-events-list.js";
import NoTripEventsItemView from "../view/no-trip-events-item.js";
import FormEditPointView from "../view/form-edit-point.js";
import TripEventsItemView from "../view/trip-events-item.js";
import {render, RenderPosition, replace, remove, EVENT_COUNT, tripEventsElement} from "../utils/render.js";

// const tripEventsElement = pageBodyElement.querySelector(`.trip-events`);

export default class Trip {
  constructor(tripContainer, tripPoints) {
    this._tripContainer = tripContainer;

    this._tripInfoComponent = new TripInfoView(tripPoints);
    this._tripInfoCostComponent = new TripInfoCostView(tripPoints);
    //  this._tripMenuComponent = new TripMenuView();
    //  this._tripFilterComponent = new TripFilterView();
    this._noTripEventsItemComponent = new NoTripEventsItemView();
    this._tripSortComponent = new TripSortView();
    this._tripEventsListComponent = new TripEventsListView();
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js


    //render(switchTripViewElement, this._tripMenuComponent, RenderPosition.AFTER);
    //render(tripControlsElement, this._tripFilterComponent, RenderPosition.BEFOREEND);

    render(this._tripContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(this._tripInfoComponent, this._tripInfoCostComponent, RenderPosition.BEFOREEND);

    this._renderTrip();
  }



  _renderEventPoint(waypoint) {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js

    const waypointComponent = new TripEventsItemView(waypoint);
    const waypointEditComponent = new FormEditPointView(waypoint);

    const replaceEventPointToForm = () => {
      replace(waypointEditComponent, waypointComponent);
    };

    const replaceFormToEventPoint = () => {
      replace(waypointComponent, waypointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();

        replaceFormToEventPoint();
        waypointComponent.setEditClickHandler(onEventRollupBtnDownClick);
        waypointEditComponent.removeEditClickHandler(onEventRollupBtnUpClick);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onEventRollupBtnDownClick = () =>{
      replaceEventPointToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
      waypointEditComponent.setEditClickHandler(onEventRollupBtnUpClick);
      waypointComponent.removeEditClickHandler(onEventRollupBtnDownClick);
    };

    const onEventRollupBtnUpClick = () =>{
      replaceFormToEventPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
      waypointComponent.setEditClickHandler(onEventRollupBtnDownClick);
      waypointEditComponent.removeEditClickHandler(onEventRollupBtnUpClick);
    };

    waypointComponent.setEditClickHandler(onEventRollupBtnDownClick);

    waypointEditComponent.setFormSubmitHandler(() => {
      replaceFormToEventPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
      waypointEditComponent.removeEditClickHandler(onEventRollupBtnUpClick);
      waypointComponent.setEditClickHandler(onEventRollupBtnDownClick);
    });

    render(this._tripEventsListComponent, waypointComponent, RenderPosition.BEFOREEND);

  }

  _renderEventPoints() {
    // Метод для рендеринга N-задач за раз
    for (let i = 0; i < Math.min(this._tripPoints.length, EVENT_COUNT); i++) {
      this._renderEventPoint(this._tripPoints[i]);
    }
  }

  _renderNoEventPoints() {
    // Метод для рендеринга заглушки
    render(tripEventsElement, this._noTripEventsItemComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js
    //  const tripEventsElement = pageBodyElement.querySelector(`.trip-events`);


    if (this._tripPoints.length === 0) {
      remove(this._tripInfoComponent);
      remove(this._tripInfoCostComponent);
      this._renderNoEventPoints();
    } else {
      render(tripEventsElement, this._tripSortComponent, RenderPosition.BEFOREEND);
      render(tripEventsElement, this._tripEventsListComponent, RenderPosition.BEFOREEND);
    }

    this._renderEventPoints();
  }
}
