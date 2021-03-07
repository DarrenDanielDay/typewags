import { CustomTypes, SupportedTypes } from "./type-system";

export interface WebAPI {
  route: string;
  name: string;
  requestMethod: RequestMethodVerbs;
  parameters: Array<RequestParameter>;
  responseType: SupportedTypes;
}

export interface RequestParameter {
  name: string;
  parameterType: SupportedTypes;
  parameterPosition: ParameterPositionKinds;
}

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

export interface WebAPIInspectResult {
  apis: Array<WebAPI>;
  definitions: Array<CustomTypes>;
}
