import type { ResolveTestEnvControl } from "#/helpers/resolve";

import { resolve } from "envkist/internal/browser";

import { testResolve } from "#/helpers/resolve";

const envControl: ResolveTestEnvControl = {
    get: (name: string): string | undefined =>
        import.meta.env[name] as string | undefined,
    set: (name: string, value: string | undefined): void => {
        if (value === void 0) {
            delete import.meta.env[name];
        } else {
            import.meta.env[name] = value;
        }
    },
};

testResolve({
    label: "browser",
    envControl,
    resolve,
});
