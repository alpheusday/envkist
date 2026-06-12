import type {
    EnvkistBoolean,
    EnvkistNumber,
    EnvkistString,
} from "#/@types/env";

const envkistString = (name: string, fallback?: string): EnvkistString => {
    return {
        __envkist: true,
        kind: "string",
        name,
        fallback,
    };
};

const envkistNumber = (name: string, fallback?: number): EnvkistNumber => {
    return {
        __envkist: true,
        kind: "number",
        name,
        fallback,
    };
};

const envkistBoolean = (name: string, fallback?: boolean): EnvkistBoolean => {
    return {
        __envkist: true,
        kind: "boolean",
        name,
        fallback,
    };
};

type EnvkistFunctions = {
    string: typeof envkistString;
    number: typeof envkistNumber;
    boolean: typeof envkistBoolean;
};

const e: EnvkistFunctions = {
    string: envkistString,
    number: envkistNumber,
    boolean: envkistBoolean,
};

export type { EnvkistFunctions };
export { e };
