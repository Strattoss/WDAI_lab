import { TripId } from "../types/tripId"

export interface Review {
    userId: string,
    nick: string,
    tripId: TripId
    rating: number,
    content: string
    date: string
}