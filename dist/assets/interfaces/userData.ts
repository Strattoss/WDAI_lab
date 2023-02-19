import { Roles } from "./roles";

// interface for data from Firebase Realtime Database
export interface UserData {
    firstName: string,
    lastName: string,
    email: string,
    roles: Roles
}