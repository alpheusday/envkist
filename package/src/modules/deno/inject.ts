import { createInject } from "#/functions/inject";

declare const Deno: {
    env: {
        get(name: string): string | undefined;
    };
};

const denoInjectAccessor = (name: string): string => {
    return `Deno.env.get("${name}")`;
};

const inject = createInject(denoInjectAccessor);

export { inject };
