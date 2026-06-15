declare const Bun: {
    env: Record<string, string | undefined>;
};

import { createResolve } from "#/functions/resolve";

const accessor = (name: string): string | undefined => {
    return Bun.env[name];
};

const resolve = createResolve(accessor);

export { accessor, resolve };
