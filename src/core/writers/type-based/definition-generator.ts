import camelcase from "camelcase";
import {
  BaseEnumType,
  CommonTypes,
  ConcreteType,
  CustomTypes,
  GenericParameterType,
  GenericType,
  ReferenceTypes,
  StructType,
  SupportedTypes,
} from "../../../schema";

export class TypeDefinitionGenerator {
  mapIdToType: Map<number, CustomTypes>;
  constructor(definitions: Array<CustomTypes>) {
    this.mapIdToType = new Map();
    for (const definition of definitions) {
      this.mapIdToType.set(definition.id, definition);
    }
  }
  generateForAll(json: SupportedTypes): string {
    if (json.kind === "common") {
      return this.generateForCommon(json);
    }
    if (json.type === "reference") {
      return this.generateForReference(json);
    }
    return this.generateForCustom(json);
  }
  generateForCustom(json: CustomTypes): string {
    if (json.type === "struct") {
      return `export interface ${json.names.simple} {
  ${json.schema
    .map((schema) => {
      return `${camelcase(schema.key)}: ${this.generateForConcreate(
        schema.value
      )}`;
    })
    .join("\n  ")}
}
`;
    }
    if (json.type === "enum") {
      return json.dataType === "number"
        ? `export enum ${json.names.simple} {
  ${json.mapping.map(({ name, value }) => `${name} = ${value},`).join("\n  ")}
}`
        : `export type ${json.names.simple} {
  ${json.enums.map((str) => `| "${str}"`).join("\n  ")}
}`;
    }
    if (json.type === "generic") {
      return `export interface ${json.names.simple}<${json.genericParameters
        .map((param) => {
          return this.generateForCustom(param);
        })
        .join(", ")}> {
  ${json.fields
    .map(({ key, value }) => `${key}: ${this.generateForAll(value)};`)
    .join("\n  ")}
}`;
    }
    if (json.type === "reference") {
      return this.generateForReference(json);
    }
    if (json.type === "generic-parameter") {
      const extendConstraints = json.constraints?.extends;
      let constraint: string = "";
      if (extendConstraints?.length) {
        constraint = ` extends (${extendConstraints
          .filter((constraint): constraint is ConcreteType => !!constraint)
          .map((constraint) => this.generateForConcreate(constraint))
          .join(" & ")})`;
      }
      return `${json.name}${constraint}`;
    }
    throw new Error("Invalid");
  }
  generateForReference(json: ReferenceTypes): string {
    const { id } = json;
    const ref = this.mapIdToType.get(id);
    switch (json.kind) {
      case "enum":
        return (ref as BaseEnumType).names.simple;
      case "generic-reference":
        const genericRef = ref as GenericType;
        return `${genericRef.names.simple}<${json.genericParameters
          .map((p) => `${this.generateForAll(p)}`)
          .join(", ")}>`;
      case "struct-reference":
        return `${(ref as StructType).names.simple}`;
      case "generic-parameter":
        return ((ref as unknown) as GenericParameterType).name;
      default:
        throw new Error("Invalid");
    }
  }
  generateForConcreate(json: ConcreteType): string {
    if (json.kind === "common") {
      return this.generateForCommon(json);
    }
    return this.generateForReference(json);
  }
  generateForCommon(json: CommonTypes) {
    if (json.type === "array") {
      const { item } = json;
      return `Array<${this.generateForAll(item)}>`;
    }
    return json.type;
  }
}
