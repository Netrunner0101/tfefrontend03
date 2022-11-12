import {Delivery} from "./Delivery";

export interface Transporter {
  id_transporter : undefined |number ,
  name : undefined | string,
  adress : undefined | string,
  city : undefined | string,
  postal_code : undefined |string ,
  email : undefined | string,
  phoneNumber : undefined | string,
  delivery : undefined | Delivery,
}
