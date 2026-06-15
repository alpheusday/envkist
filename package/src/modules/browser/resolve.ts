import { createResolve } from "#/functions/resolve";

declare global {
    interface ImportMeta {
        env: Record<string, string | undefined>;
    }
}

const accessor = (name: string): string | undefined => {
    return import.meta.env?.[name];
};

const resolve = createResolve(accessor);

export { accessor, resolve };
