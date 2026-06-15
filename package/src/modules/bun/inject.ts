import { createInject } from "#/functions/inject";

const accessor = (name: string): string => {
    return `Bun.env.${name}`;
};

const inject = createInject(accessor);

export { accessor, inject };
