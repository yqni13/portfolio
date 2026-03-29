import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
let targetPath;
switch(process.env['ENV_MODE']) {
    case('staging'): {
        targetPath = "./src/environment/environment.stag.ts";
        break;
    }
    case('production'):
    default: {
        targetPath = "./src/environment/environment.prod.ts";
    }
}

const envConfigFile = `import { Environment } from "./environment.model";

export const environment: Environment = {
    ENV_MODE: '${process.env['ENV_MODE']}',
};
`;
fs.writeFileSync(targetPath, envConfigFile);
console.log(`Output generated at ${targetPath}`);