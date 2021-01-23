import {FilterType} from "../const";
import {isPointFuture, isPointPast} from "./event-point";

export const filter = {
  [FilterType.EVERYTHING]: (waypoints) => waypoints,
  [FilterType.FUTURE]: (waypoints) => waypoints.filter((waypoint) => isPointFuture(waypoint.startTime)),
  [FilterType.PAST]: (waypoints) => waypoints.filter((waypoint) => isPointPast(waypoint.endTime))
};
