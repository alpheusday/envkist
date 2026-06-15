import type { ResolveTestEnvControl } from "#/helpers/resolve";

import { resolve } from "envkist/internal/bun";
import { beforeEach, vi } from "vitest";

import { testResolve } from "#/helpers/resolve";

const mockBunEnv: Record<string, string | undefined> = {};

const envControl: ResolveTestEnvControl = {
    get: (name: string): string | undefined => mockBunEnv[name],
    set: (name: string, value: string | undefined): void => {
        if (value === void 0) {
            delete mockBunEnv[name];
        } else {
            mockBunEnv[name] = value;
        }
    },
};

beforeEach((): void => {
    vi.stubGlobal("Bun", {
        env: mockBunEnv,
    });
});

testResolve({
    label: "bun",
    envControl,
    resolve,
});
