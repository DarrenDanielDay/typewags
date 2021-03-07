import axios from "axios";
import path from "path";
import fs from "fs/promises";
import { WebAPIInspectResult } from "../schema/structs/typed-web-api-json";
import { ApiBundleGenerator } from "../core/writers/type-based/api-bundle-generator";

export async function main() {
  const json = await axios.get<WebAPIInspectResult>(
    "http://localhost:5000/typewags"
  );
  const { data } = json;
  console.log(JSON.stringify(data, undefined, 2))
  const generator = new ApiBundleGenerator(data);
  const declarationContent = generator.generateApiInterfaceBundle();
  await fs.writeFile(
    path.resolve(process.cwd(), "src/example/bundle.ts"),
    declarationContent
  );
}

main()
  .then(() => {
    console.log("Example done.");
  })
  .catch((e) => {
    console.log("Example crashed:", e);
  });
