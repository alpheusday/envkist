import { createInject } from "#/functions/inject";

const denoInjectAccessor = (name: string): string => {
    return `Deno.env.get("${name}")`;
};

const inject = createInject(denoInjectAccessor);

export { inject };
