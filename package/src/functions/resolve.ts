import type { EnvValue, Infer } from "#/@types/env";

const resolveString = (name: string, fallback?: string): string | undefined => {
    const raw: string | undefined = process.env[name];

    if (raw !== void 0) return raw;

    return fallback;
};

const resolveNumber = (name: string, fallback?: number): number | undefined => {
    const raw: string | undefined = process.env[name];

    if (raw !== void 0) {
        const parsed: number = Number(raw);
        if (!Number.isNaN(parsed)) return parsed;
    }

    return fallback;
};

const resolveBoolean = (
    name: string,
    fallback?: boolean,
): boolean | undefined => {
    const raw: string | undefined = process.env[name];

    if (raw !== void 0) return raw === "true" || raw === "1";

    return fallback;
};

const resolve = <T extends EnvValue>(value: T): Infer<T> => {
    if (value.kind === "string") {
        return resolveString(
            value.name,
            value.fallback as string | undefined,
        ) as Infer<T>;
    }

    if (value.kind === "number") {
        return resolveNumber(
            value.name,
            value.fallback as number | undefined,
        ) as Infer<T>;
    }

    return resolveBoolean(
        value.name,
        value.fallback as boolean | undefined,
    ) as Infer<T>;
};

export { resolve };
