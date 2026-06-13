import { createResolve } from "#/functions/resolve";

const browserResolveAccessor = (name: string): string | undefined => {
    const env = (
        import.meta as unknown as Record<
            string,
            Record<string, string | undefined>
        >
    ).env;
    return env?.[name];
};

const resolve = createResolve(browserResolveAccessor);

export { resolve };
