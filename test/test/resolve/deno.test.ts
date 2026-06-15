import type { ResolveTestEnvControl } from "#/helpers/resolve";

import { resolve } from "envkist/internal/deno";
import { beforeEach, vi } from "vitest";

import { testResolve } from "#/helpers/resolve";

const mockDenoEnv: Record<string, string | undefined> = {};

const mockDeno = {
    env: {
        get: (name: string): string | undefined => mockDenoEnv[name],
    },
};

const envControl: ResolveTestEnvControl = {
    get: (name: string): string | undefined => mockDenoEnv[name],
    set: (name: string, value: string | undefined): void => {
        if (value === void 0) {
            delete mockDenoEnv[name];
        } else {
            mockDenoEnv[name] = value;
        }
    },
};

beforeEach((): void => {
    vi.stubGlobal("Deno", mockDeno);
});

testResolve({
    label: "deno",
    envControl,
    resolve,
});
