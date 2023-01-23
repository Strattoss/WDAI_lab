import { ImgInfo } from "./imgInfo";

export interface Trip {
    name: string;
    destination: string;
    startDate: string;
    endDate: string;
    unitPrice: number;
    freeSeats: number;
    description: string;
    imgs: ImgInfo[];
    ratings: number[];
}