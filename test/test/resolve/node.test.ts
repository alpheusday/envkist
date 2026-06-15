import type { ResolveTestEnvControl } from "#/helpers/resolve";

import { resolve } from "envkist";

import { testResolve } from "#/helpers/resolve";

const envControl: ResolveTestEnvControl = {
    get: (name: string): string | undefined => process.env[name],
    set: (name: string, value: string | undefined): void => {
        if (value === void 0) {
            delete process.env[name];
        } else {
            process.env[name] = value;
        }
    },
};

testResolve({
    label: "node",
    envControl,
    resolve,
});
