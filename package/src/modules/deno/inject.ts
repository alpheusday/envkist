import { createInject } from "#/functions/inject";

const accessor = (name: string): string => {
    return `Deno.env.get("${name}")`;
};

const inject = createInject(accessor);

export { accessor, inject };
