import type { EnvValue, Infer } from "#/@types/env";

import { createResolve } from "#/functions/resolve";

type CloudflareEnv = Record<string, string | undefined>;

const cloudflareResolveAccessor = (
    env: CloudflareEnv,
): ((name: string) => string | undefined) => {
    return (name: string): string | undefined => {
        return env[name];
    };
};

type ResolveFunction = <T extends EnvValue>(
    value: T,
    env: CloudflareEnv,
) => Infer<T>;

const resolve: ResolveFunction = <T extends EnvValue>(
    value: T,
    env: CloudflareEnv,
): Infer<T> => {
    const accessor = cloudflareResolveAccessor(env);
    const resolveFn = createResolve(accessor);
    return resolveFn(value);
};

export type { CloudflareEnv, ResolveFunction };
export { resolve };
