import type { ResolveTestEnvControl } from "#/helpers/resolve";

import { resolve } from "envkist/internal/cloudflare";

import { testResolve } from "#/helpers/resolve";
import { env as cloudflareEnv } from "#/mocks/cloudflare-workers";

const envControl: ResolveTestEnvControl = {
    get: (name: string): string | undefined => cloudflareEnv[name],
    set: (name: string, value: string | undefined): void => {
        if (value === void 0) {
            delete cloudflareEnv[name];
        } else {
            cloudflareEnv[name] = value;
        }
    },
};

testResolve({
    label: "cloudflare",
    envControl,
    resolve,
});
