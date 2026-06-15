import type { ResolveTestEnvControl } from "#/helpers/resolve";

import { createResolve } from "envkist/internal/functions/resolve";

import { testResolve } from "#/helpers/resolve";

const mockEnv: Record<string, string | undefined> = {};

const customAccessor = (name: string): string | undefined => mockEnv[name];

const envControl: ResolveTestEnvControl = {
    get: (name: string): string | undefined => mockEnv[name],
    set: (name: string, value: string | undefined): void => {
        if (value === void 0) {
            delete mockEnv[name];
        } else {
            mockEnv[name] = value;
        }
    },
};

testResolve({
    label: "custom",
    envControl,
    resolve: createResolve(customAccessor),
});
