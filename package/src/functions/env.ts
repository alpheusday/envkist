import type { EnvBoolean, EnvNumber, EnvString } from "#/@types/env";

function envString(name: string): EnvString<undefined>;

function envString<F extends string>(name: string, fallback: F): EnvString<F>;

function envString<F extends string | undefined>(
    name: string,
    fallback?: F,
): EnvString<F> {
    return {
        _envkist: true,
        kind: "string",
        name,
        fallback: fallback as F,
    };
}

function envNumber(name: string): EnvNumber<undefined>;

function envNumber<F extends number>(name: string, fallback: F): EnvNumber<F>;

function envNumber<F extends number | undefined>(
    name: string,
    fallback?: F,
): EnvNumber<F> {
    return {
        _envkist: true,
        kind: "number",
        name,
        fallback: fallback as F,
    };
}

function envBoolean(name: string): EnvBoolean<undefined>;

function envBoolean<F extends boolean>(
    name: string,
    fallback: F,
): EnvBoolean<F>;

function envBoolean<F extends boolean | undefined>(
    name: string,
    fallback?: F,
): EnvBoolean<F> {
    return {
        _envkist: true,
        kind: "boolean",
        name,
        fallback: fallback as F,
    };
}

type EnvFunctions = {
    string: typeof envString;
    number: typeof envNumber;
    boolean: typeof envBoolean;
};

const env: EnvFunctions = {
    string: envString,
    number: envNumber,
    boolean: envBoolean,
};

export type { EnvFunctions };
export { env };
