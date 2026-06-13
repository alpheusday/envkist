import { createInject } from "#/functions/inject";

const browserInjectAccessor = (name: string): string => {
    return `import.meta.env.${name}`;
};

const inject = createInject(browserInjectAccessor);

export { inject };
