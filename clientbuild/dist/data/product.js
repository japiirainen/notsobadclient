import * as I from "../../_snowpack/pkg/io-ts.js";
export const ProductWithAvailability = I.interface({
  color: I.array(I.string),
  id: I.string,
  name: I.string,
  manufacturer: I.string,
  price: I.number,
  type: I.string,
  availability: I.string
});
