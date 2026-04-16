import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
let targetPath;
switch(process.env['ENV_MODE']) {
    case('staging'): {
        targetPath = "./src/environments/environment.stag.ts";
        break;
    }
    case('production'):
    default: {
        targetPath = "./src/environments/environment.prod.ts";
    }
}

const envConfigFile = `import { Environment } from "./environment.model";

export const environment: Environment = {
    ENV_MODE: '${process.env['ENV_MODE']}',
    NOTIFY_ADMIN_ID: '${process.env['NOTIFY_ADMIN_ID']}',
    NOTIFY_BOT_KEY: '${process.env['NOTIFY_BOT_KEY']}',
    API_STORAGE_URL: '${process.env['API_STORAGE_URL']}'
};
`;
fs.writeFileSync(targetPath, envConfigFile);
console.log(`Output generated at ${targetPath}`);