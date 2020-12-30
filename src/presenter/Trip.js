import TripInfoView from "./view/trip-info.js";
import TripInfoCostView from "./view/trip-info-cost.js";
import SiteMenuView from "./view/trip-menu.js";
import TripFilterView from "./view/trip-filter.js";
import TripSortView from "./view/trip-sort.js";
import TripEventsListView from "./view/trip-events-list.js";
import NoTripEventsItemView from "./view/no-trip-events-item.js";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._tripInfoComponent = new TripInfoView();
    this._tripInfoCostComponent = new TripInfoCostView();
    this._siteMenuComponent = new SiteMenuView();
    this._tripFilterComponent = new TripFilterView();
    this._noTripEventsItemComponent = new NoTripEventsItemView();
    this._tripSortComponent = new TripSortView();
    this._tripEventsListComponent = new TripEventsListView();
  }

  init(tripPoints) {
    this.tripPoints = tripPoints.slice();
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
  }

  _renderTripInfo() {
    // Метод для рендеринга
  }

  _renderTripInfoCost() {
    // Метод для рендеринга
  }

  _renderSiteMenu() {
    // Метод для рендеринга
  }

  _renderTripFilter() {
    // Метод для рендеринга
  }

  _renderEventPoint() {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js
  }

  _renderEventPoints() {
    // Метод для рендеринга N-задач за раз
  }

  _renderNoEventPoints() {
    // Метод для рендеринга заглушки
  }

  _renderTrip() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js
  }
}
