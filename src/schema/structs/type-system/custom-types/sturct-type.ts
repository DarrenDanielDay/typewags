import { ReferenceType } from "../common-types";
import { BaseCustomType } from "./base";
import { ConcreteType } from "./generic-type";

export interface StructType extends BaseCustomType {
  type: "struct";
  schema: Array<{
    key: string;
    value: ConcreteType;
  }>;
}

export interface StructReference extends ReferenceType {
  kind: "struct-reference";
}
