import type { InputOptions, Plugin } from "rolldown";

import { env, resolve } from "envkist";
import { defineConfig } from "rolldown";

const toDefineValue = (
    value: string | number | boolean | undefined,
): string => {
    if (value === void 0) return "void 0";
    return JSON.stringify(value);
};

const pluginResolve = (): Plugin => {
    const defs: Record<string, string> = {
        __envkist_PORT: toDefineValue(resolve(env.string("PORT"))),
        __envkist_HOST: toDefineValue(resolve(env.string("HOST", "localhost"))),
        __envkist_DEBUG: toDefineValue(resolve(env.boolean("DEBUG"))),
        __envkist_TIMEOUT: toDefineValue(resolve(env.number("TIMEOUT", 5000))),
    };

    return {
        name: "plugin-resolve",
        options(options: InputOptions): InputOptions {
            return {
                ...options,
                transform: {
                    ...options.transform,
                    define: {
                        ...options.transform?.define,
                        ...defs,
                    },
                },
            };
        },
    };
};

export default defineConfig({
    input: "./src/index.ts",
    plugins: [
        pluginResolve(),
    ],
});
