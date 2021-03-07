import { ReferenceTypes } from "../common-types";
import { EnumTypes } from "./enum-type";
import { GenericParameterType, GenericType } from "./generic-type";
import { StructType } from "./sturct-type";

export * from "./base";
export * from "./enum-type";
export * from "./generic-type";
export * from "./sturct-type";

export type CustomTypes =
  | EnumTypes
  | StructType
  | GenericType
  | GenericParameterType
  | ReferenceTypes;
