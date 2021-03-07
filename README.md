# typewags

A typescript web API generator script.

## Usage

To generate the TypeScript definitions, you need a type definition and web API information JSON.

Here is a NuGet package for `ASP.NET Core` projects to generate the JSON:

[typewags-aspnetcore](https://www.nuget.org/packages/typewags-aspnetcore)

Here is an example of usage if you followed the example of [typewags-aspnetcore](https://www.nuget.org/packages/typewags-aspnetcore).

```ts
import axios from "axios";
import path from "path";
import fs from "fs/promises";
import { WebAPIInspectResult, ApiBundleGenerator} from "typewags";

const response = await axios.get<WebAPIInspectResult>(
// If you follow the example, you can get the definition json by the following request.
"http://localhost:5000/typewags"
);
const json = response.data;
// Generate all of the definitions by a simple API.
const generator = new ApiBundleGenerator(json);
const declarationContent = generator.generateApiInterfaceBundle();
await fs.writeFile(
  path.resolve(process.cwd(), "bundle.ts"),
  declarationContent
);
```

