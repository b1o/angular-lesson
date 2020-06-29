import { GeoLocation } from './geoLocation';

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoLocation;
}
