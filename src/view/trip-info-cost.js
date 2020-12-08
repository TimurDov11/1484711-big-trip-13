export const createTripInfoCostTemplate = (waypoints) => {
  const calculateTotalPrice = waypoints.reduce((accumulator, waypoint) => {
    return accumulator + waypoint.price;
  }, 0);

  return `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${calculateTotalPrice}</span>
    </p>`;
};
