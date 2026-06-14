import { createResolve } from "#/functions/resolve";

declare global {
    interface ImportMeta {
        env: Record<string, string | undefined>;
    }
}

const browserResolveAccessor = (name: string): string | undefined => {
    return import.meta.env?.[name];
};

const resolve = createResolve(browserResolveAccessor);

export { resolve };
