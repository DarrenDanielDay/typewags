import { CommonTypes } from ".";
import { ReferenceTypes } from "../custom-types/reference-type";
import { BaseCommonType } from "./base";

export interface ArrayType extends BaseCommonType {
  type: "array";
  item: CommonTypes | ReferenceTypes;
}
