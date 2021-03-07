import { BaseType } from "../base-type";

export interface BaseCustomType extends BaseType {
  kind: "custom";
  id: number;
  names: {
    simple: string;
    full: string;
    module: string;
  };
}
