import {Delivery} from "./Delivery";

export interface Warehouse {
  id_warehouse : undefined | number,
  ref_nummer : undefined | string,
  number_package: undefined | number,
  weight: undefined | number,
  dimension : undefined | string,
  adress : undefined | string,
  city : undefined | string,
  postal_code : undefined | string,
  inbound_date : undefined | Date,
  outbound_date: undefined | Date,
  remarks : undefined | string,
}
