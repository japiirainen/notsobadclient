import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';

const {SNOWPACK_PUBLIC_API_URL} = __SNOWPACK_ENV__;
import {identity} from "../../_snowpack/pkg/fp-ts/function.js";
export const getCategory = (c) => fetch(`${SNOWPACK_PUBLIC_API_URL}/category/${c}`).then((res) => res.json()).catch(identity);
