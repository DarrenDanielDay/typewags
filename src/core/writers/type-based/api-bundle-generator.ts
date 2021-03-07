import { CustomTypes } from "../../../schema";
import {
  RequestParameter,
  WebAPI,
  WebAPIInspectResult,
} from "../../../schema/structs/typed-web-api-json";
import { TypeDefinitionGenerator } from "./definition-generator";

function uncapitalize(s: string) {
  return `${s.slice(0, 1).toLowerCase()}${s.slice(1)}`;
}

function uncapitalizeJson<T>(json: T): T {
  if (Array.isArray(json)) {
    return json.map((o) => uncapitalizeJson(o)) as never;
  }
  if (json && typeof json === "object") {
    return Object.entries(json).reduce(
      (prev, [key, value]) => (
        (prev[uncapitalize(key)] = uncapitalizeJson(value)), prev
      ),
      Object.create(Object.prototype)
    );
  }
  return json;
}

export class ApiBundleGenerator {
  definitionGenerator: TypeDefinitionGenerator;
  definitionBundle: string;
  definitions: Array<CustomTypes>;
  apis: Array<WebAPI>;
  constructor(inspectorResult: WebAPIInspectResult) {
    const { definitions, apis } = uncapitalizeJson(inspectorResult);
    this.definitions = definitions;
    this.apis = apis;
    this.definitionGenerator = new TypeDefinitionGenerator(definitions);
    this.definitionBundle = definitions
      .filter((definition) => definition.type !== "generic-parameter")
      .map((definition) =>
        this.definitionGenerator.generateForCustom(definition)
      )
      .join("\n");
  }

  generateApiInterfaceBundle(): string {
    return `
${this.definitionBundle}
export type RequestMethodVerbs =
  | "get"
  | "post"
  | "put"
  | "patch"
  | "delete"
  | "head"
  | "options";
export type ParameterPositionKinds =
  | "query"
  | "route"
  | "body"
  | "form"
  | "header";
export interface ParameterInfo<
    Name extends string,
    Position extends ParameterPositionKinds,
    Type
> {
  name: Name;
  position: Position;
  type: Type;
}
export interface APIInfo<
  Name extends string,
  Method extends RequestMethodVerbs,
  Parameters extends readonly unknown[],
  Response
> {
    name: Name;
    method: Method;
    parameters: Parameters;
    responseType: Response;
}
export interface APIMapping {
  ${this.apis
    .map((api) => `["${api.route}"](): ${this.generateApiInfo(api)}`)
    .join("\n  ")}
}`;
  }

  generateApiInfo(api: WebAPI): string {
    return `APIInfo<"${api.name}", "${
      api.requestMethod
    }", [${api.parameters
      .map((parameter) => this.generateParamInfo(parameter))
      .join(", ")}], ${this.definitionGenerator.generateForAll(
      api.responseType
    )}>`;
  }

  generateParamInfo(parameter: RequestParameter) {
    return `ParameterInfo<"${parameter.name}", "${
      parameter.parameterPosition
    }", ${this.definitionGenerator.generateForAll(parameter.parameterType)}>`;
  }
}
