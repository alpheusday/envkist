import { createResolve } from "#/functions/resolve";

const accessor = (name: string): string | undefined => {
    return process.env[name];
};

const resolve = createResolve(accessor);

export { accessor, resolve };
