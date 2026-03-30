## 🗒️ $\textsf{\color{salmon}set-env.dev.ts Setup}$

### Create this file as "set-env.dev.ts" at the root of /frontend.

```sh
import * as fs_dev from "fs";
const targetPath_dev = "./src/environments/environment.ts";
const envConfigFile_dev = `import { Environment } from "./environment.model";

export const environment: Environment = {
    ENV_MODE: '', /*select your environment like "development"*/
};
`;
fs_dev.writeFileSync(targetPath_dev, envConfigFile_dev);
console.log(`Output generated at ${targetPath_dev}`);
```