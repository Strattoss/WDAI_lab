import { ImgInfo } from "./imgInfo";

export interface Trip {
    name: string;
    destination: string;
    startDate: Date;
    endDate: Date;
    unitPrice: number;
    freeSeats: number;
    description: string;
    imgs: ImgInfo[];
    ratings: number[];
}