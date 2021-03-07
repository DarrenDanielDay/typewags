export type JsonPrimitive = "number" | "string" | "boolean" | "enum";
export type GeneralJsonItemType = JsonPrimitive | "array" | "object";

interface BaseJsonSchema {
  type: GeneralJsonItemType;
  nullable: boolean;
}

export type JsonItemSchema =
  | PrimitiveJsonSchema
  | NumberEnumJsonItemSchema
  | StringEnumJsonItemSchema
  | ArrayJsonItemSchema
  | ObjectJsonItemSchema;

export interface PrimitiveJsonSchema extends BaseJsonSchema {
  type: "number" | "string" | "boolean";
}

interface EnumJsonItemSchema extends BaseJsonSchema {
  type: "enum";
  enumType: "string" | "number";
  enumName: string;
}

export interface NumberEnumJsonItemSchema extends EnumJsonItemSchema {
  enumType: "number";
  enumMappings: Array<{
    num: number;
    enumRepr: string;
  }>;
}

export interface StringEnumJsonItemSchema extends EnumJsonItemSchema {
  enumType: "string";
  enums: string[];
}

export interface ArrayJsonItemSchema extends BaseJsonSchema {
  type: "array";
  itemSchema: JsonItemSchema;
}

export interface ObjectJsonItemSchema extends BaseJsonSchema {
  type: "object";
  structName: string;
  schemas: Array<{
    key: string;
    schema: JsonItemSchema;
  }>;
}

export interface JsonBasedWebAPIDescriptor {
  route: string;
  request: JsonItemSchema;
  response: JsonItemSchema;
}
