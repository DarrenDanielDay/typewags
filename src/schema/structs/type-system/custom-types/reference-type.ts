import { BaseType } from "../base-type";
import { EnumReference } from "./enum-type";
import {
  GenericReference,
  GenericTypeParameterReference,
} from "./generic-type";
import { StructReference } from "./sturct-type";

export interface ReferenceType extends BaseType {
  type: "reference";
  id: number;
}

export type ReferenceTypes =
  | StructReference
  | EnumReference
  | GenericReference
  | GenericTypeParameterReference;
