declare const Bun: {
    env: Record<string, string | undefined>;
};

import { createResolve } from "#/functions/resolve";

const bunResolveAccessor = (name: string): string | undefined => {
    return Bun.env[name];
};

const resolve = createResolve(bunResolveAccessor);

export { resolve };
