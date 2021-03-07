export type BasicType = "number" | "string" | "boolean" | "array";
export type ReferenceTypes = "enum" | "struct" | "generic";

export type GeneralType = BasicType | ReferenceTypes;

export type DetailedStructs =
  | PrimitiveStruct
  | ArrayStruct
  | EnumStruct
  | PlainObjectStruct;

export type NestedStructs = PrimitiveStruct | ArrayStruct;

export interface BaseStruct {
  type: GeneralType;
}

export interface PrimitiveStruct extends BaseStruct {
  type: "number" | "string" | "boolean";
}

export interface ArrayStruct extends BaseStruct {
  type: "array";
  itemStruct: NestedStructs;
}

export interface ServerStructReference extends BaseStruct {
  type: ReferenceTypes;
}

export interface DetailedServerStruct extends ServerStructReference {
  /**
   * Unique for each server-defined type.
   */
  typeId: number;
  /**
   * Direct name for a server-defined type.
   * For example, `ChangeTracker` is the simple name of `Microsoft.EntityFramework.ChangeTracker`.
   */
  simpleName: string;
  /**
   * Module name for a server-defined type.
   * For example, `Microsoft.EntityFramework` is the module name of `Microsoft.EntityFramework.ChangeTracker`.
   */
  moduleName: string;
}

export type EnumStruct = NumberEnumStruct | StringEnumStruct;

export interface BaseEnumStruct extends DetailedServerStruct {
  type: "enum";
  enumType: "string" | "number";
}

export interface NumberEnumStruct extends BaseEnumStruct {
  enumType: "number";
  enumNames: Array<{
    number: number;
    name: string;
    desc?: string;
  }>;
}

export interface StringEnumStruct extends BaseEnumStruct {
  enumType: "string";
  enumNames: Array<{
    name: string;
    desc?: string;
  }>;
}

export interface PlainObjectStruct extends DetailedServerStruct {
  type: "struct";
  schemas: Array<{
    key: string;
    nullable?: boolean;
    struct: NestedStructs;
  }>;
}

export interface GenericObjectStruct extends DetailedServerStruct {
  type: "generic";
  genericParams: Array<{
    typeName: string;
    extends?: NestedStructs;
  }>;
  schemas: Array<{
    key: string;
    nullable?: boolean;
    struct: NestedStructs | {};
  }>;
}

// export interface GenericReference {
//     genericId: number;
//     parameters: Array<NestedStructs>
// }

export interface TypeBasedWebAPIDescriptor {
  route: string;
  request: NestedStructs;
  response: NestedStructs;
}
