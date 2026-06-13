import { createInject } from "#/functions/inject";

const bunInjectAccessor = (name: string): string => {
    return `Bun.env.${name}`;
};

const inject = createInject(bunInjectAccessor);

export { inject };
