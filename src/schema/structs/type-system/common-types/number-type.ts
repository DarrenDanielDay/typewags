import { BaseCommonType } from "./base";

export interface NumberType extends BaseCommonType {
  type: "number";
  format?: `int${32 | 64}` | `float${32 | 64}`;
}
