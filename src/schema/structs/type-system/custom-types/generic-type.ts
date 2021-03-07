import { CommonTypes } from "../common-types";
import { ReferenceType } from "./reference-type";
import { BaseCustomType } from "./base";
import { StructReference } from "./sturct-type";
import { SupportedTypes } from "..";
import { EnumReference } from "./enum-type";

export interface GenericType extends BaseCustomType {
  type: "generic";
  genericParameters: Array<GenericParameterType>;
  fields: Array<{
    key: string;
    value: SupportedTypes;
  }>;
}
export interface GenericParameterType extends BaseCustomType {
  type: "generic-parameter";
  definedIn: number;
  name: string;
  constraints?: {
    extends?: Array<SupportedTypes>;
    super?: Array<SupportedTypes>;
  };
}

export interface GenericTypeParameterReference extends ReferenceType {
  kind: "generic-parameter";
}

export interface GenericReference extends ReferenceType {
  kind: "generic-reference";
  genericParameters: Array<SupportedTypes>;
}

export interface FullGenericReference extends GenericReference {
  genericParameters: Array<ConcreteType>;
}

export type ConcreteType =
  | CommonTypes
  | FullGenericReference
  | StructReference
  | EnumReference;
