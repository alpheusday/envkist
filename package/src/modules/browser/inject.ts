import { createInject } from "#/functions/inject";

const accessor = (name: string): string => {
    return `import.meta.env.${name}`;
};

const inject = createInject(accessor);

export { accessor, inject };
