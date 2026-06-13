import { env, inject } from "envkist";
import { defineConfig, type InputOptions, type Plugin } from "rolldown";

const pluginInject = (): Plugin => {
    const defs: Record<string, string> = {
        __envkist_PORT: inject(env.string("PORT")),
        __envkist_HOST: inject(env.string("HOST", "localhost")),
        __envkist_DEBUG: inject(env.boolean("DEBUG")),
        __envkist_TIMEOUT: inject(env.number("TIMEOUT", 5000)),
    };

    return {
        name: "plugin-inject",
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
        pluginInject(),
    ],
});
