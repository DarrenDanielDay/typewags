import { CommonTypes } from "./common-types";
import { CustomTypes } from "./custom-types";

export * from "./common-types";
export * from "./custom-types";
export type SupportedTypes = CommonTypes | CustomTypes;
