import { env } from "cloudflare:workers";

import { createResolve } from "#/functions/resolve";

type CloudflareEnv = {
    [key: string]: string | undefined;
};

const cloudflareResolveAccessor = (name: string): string | undefined => {
    return (env as CloudflareEnv)[name];
};

const resolve = createResolve(cloudflareResolveAccessor);

export { resolve };
