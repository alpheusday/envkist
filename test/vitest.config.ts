import * as Path from "node:path";

import tsconfigPath from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
    resolve: {
        alias: {
            "cloudflare:workers": Path.resolve(
                __dirname,
                "src",
                "mocks",
                "cloudflare-workers.ts",
            ),
        },
    },
    test: {
        logHeapUsage: true,
    },
    plugins: [
        tsconfigPath(),
    ],
});
