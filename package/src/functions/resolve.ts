import type { EnvValue, Infer } from "#/@types/env";
import type {
    CreateResolve,
    ResolveAccessor,
    ResolveFunction,
} from "#/@types/resolve";

const resolveString = (
    accessor: ResolveAccessor,
    name: string,
    fallback?: string,
): string | undefined => {
    const raw: string | undefined = accessor(name);

    if (raw !== void 0) return raw;

    return fallback;
};

const resolveNumber = (
    accessor: ResolveAccessor,
    name: string,
    fallback?: number,
): number | undefined => {
    const raw: string | undefined = accessor(name);

    if (raw !== void 0) {
        const parsed: number = Number(raw);
        if (!Number.isNaN(parsed)) return parsed;
    }

    return fallback;
};

const resolveBoolean = (
    accessor: ResolveAccessor,
    name: string,
    fallback?: boolean,
): boolean | undefined => {
    const raw: string | undefined = accessor(name);

    if (raw !== void 0) return raw === "true" || raw === "1";

    return fallback;
};

const createResolve: CreateResolve = (
    accessor: ResolveAccessor,
): ResolveFunction => {
    return <T extends EnvValue>(value: T): Infer<T> => {
        if (value.kind === "string") {
            return resolveString(
                accessor,
                value.name,
                value.fallback as string | undefined,
            ) as Infer<T>;
        }

        if (value.kind === "number") {
            return resolveNumber(
                accessor,
                value.name,
                value.fallback as number | undefined,
            ) as Infer<T>;
        }

        return resolveBoolean(
            accessor,
            value.name,
            value.fallback as boolean | undefined,
        ) as Infer<T>;
    };
};

export { createResolve };
