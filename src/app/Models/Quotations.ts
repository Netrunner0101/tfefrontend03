import {Transporter} from "./Transporter";

export interface Quotations {
  id_quotations : undefined | number,
  departure_adress : undefined | string,
  departure_city : undefined | string,
  departure_postal_code : undefined | string,
  destination_adress : undefined | string,
  destination_city : undefined | string,
  destination_postal_code : undefined | string,
  type_transport : undefined | string,
  price : undefined | number,
  transporter: undefined | Transporter,
}
