import * as Path from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
    resolve: {
        tsconfigPaths: true,
        alias: {
            "cloudflare:workers": Path.resolve(
                import.meta.dirname,
                "src",
                "mocks",
                "cloudflare-workers.ts",
            ),
        },
    },
    test: {
        logHeapUsage: true,
    },
});
