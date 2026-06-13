import { createResolve } from "#/functions/resolve";

declare const Deno: {
    env: {
        get(name: string): string | undefined;
    };
};

const denoResolveAccessor = (name: string): string | undefined => {
    return Deno.env.get(name);
};

const resolve = createResolve(denoResolveAccessor);

export { resolve };
