import { defineConfig } from "@apst/tsdown";
import { cjsPreset, dtsPreset, esmPreset } from "@apst/tsdown/presets";

export default defineConfig(
    {
        entry: [
            "./src/**/*.ts",
        ],
        deps: {
            neverBundle: [
                "cloudflare:workers",
            ],
        },
        platform: "neutral",
        unbundle: true,
    },
    [
        esmPreset(),
        cjsPreset(),
        dtsPreset(),
    ],
);
