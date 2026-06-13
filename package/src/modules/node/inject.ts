import { createInject } from "#/functions/inject";

const nodeInjectAccessor = (name: string): string => {
    return `process.env.${name}`;
};

const inject = createInject(nodeInjectAccessor);

export { inject };
