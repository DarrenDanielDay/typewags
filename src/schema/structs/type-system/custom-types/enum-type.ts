import { ReferenceType } from "../common-types";
import { BaseCustomType } from "./base";

export interface BaseEnumType extends BaseCustomType {
  type: "enum";
  dataType: string;
}

export interface StringEnumType extends BaseEnumType {
  dataType: "string";
  enums: string[];
}

export interface NumberEnumType extends BaseEnumType {
  dataType: "number";
  mapping: Array<{
    name: string;
    value: number;
    description?: string;
  }>;
}

export interface EnumReference extends ReferenceType {
  kind: "enum";
}

export type EnumTypes = StringEnumType | NumberEnumType;
