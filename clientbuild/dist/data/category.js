import * as I from "../../_snowpack/pkg/io-ts.js";
import {ProductWithAvailability} from "./product.js";
export const Category = I.array(ProductWithAvailability);
