import { BaseCommonType } from "./base";

export interface StringType extends BaseCommonType {
  type: "string";
  /**
   * A RegExp string
   */
  format?: string;
}
