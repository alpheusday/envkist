import { createResolve } from "#/functions/resolve";

const nodeResolveAccessor = (name: string): string | undefined => {
    return process.env[name];
};

const resolve = createResolve(nodeResolveAccessor);

export { resolve };
