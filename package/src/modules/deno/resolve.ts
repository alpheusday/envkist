import { createResolve } from "#/functions/resolve";

declare const Deno: {
    env: {
        get(name: string): string | undefined;
    };
};

const accessor = (name: string): string | undefined => {
    return Deno.env.get(name);
};

const resolve = createResolve(accessor);

export { accessor, resolve };
