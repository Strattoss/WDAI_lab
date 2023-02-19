import { TripId } from "../types/tripId";

export interface Reservation {
    tripId: TripId,
    tickets: number
}