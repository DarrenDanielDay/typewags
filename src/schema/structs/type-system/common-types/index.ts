import { ArrayType } from "./array-type";
import { BooleanType } from "./boolean-type";
import { DynamicType } from "./dynamic-type";
import { NumberType } from "./number-type";
import { StringType } from "./string-type";

export * from "./base";
export * from "./number-type";
export * from "./string-type";
export * from "./boolean-type";
export * from "./array-type";
export * from "../custom-types/reference-type";
export type CommonTypes =
  | NumberType
  | StringType
  | BooleanType
  | ArrayType
  | DynamicType;
