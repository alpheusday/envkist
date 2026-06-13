import { createInject } from "#/functions/inject";

const cloudflareInjectAccessor = (name: string): string => {
    return `env.${name}`;
};

const inject = createInject(cloudflareInjectAccessor);

export { inject };
