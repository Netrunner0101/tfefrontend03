import {Customer} from "./Customer";
import {Transporter} from "./Transporter";
import {Warehouse} from "./Warehouse";

export interface Delivery {
  id_delivery: undefined | number,
  number_package : undefined | number,
  weight: undefined | number,
  dimension: undefined | string,
  departure_adress: undefined | string,
  departure_city : undefined | string,
  departure_postal_code : undefined | string,
  destination_adress : undefined | string,
  destination_city : undefined | string,
  destination_postal_code : undefined | string,
  outbout_date: undefined | Date,
  arrival_date: undefined | Date,
  remarks:undefined | string,
  customer: undefined | Customer,
  transporter: undefined | Transporter,
  warehouse: undefined | Warehouse,
}

export interface DeliveryPost {
  id_delivery: undefined | number,
  number_package : undefined | number,
  weight: undefined | number,
  dimension: undefined | string,
  departure_adress: undefined | string,
  departure_city : undefined | string,
  departure_postal_code : undefined | string,
  destination_adress : undefined | string,
  destination_city : undefined | string,
  destination_postal_code : undefined | string,
  outbout_date: undefined | Date,
  arrival_date: undefined | Date,
  remarks:undefined | string
}
