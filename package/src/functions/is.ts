import type { EnvValue } from "#/@types/env";

const isAny = (value: unknown): value is EnvValue => {
    if (typeof value !== "object") return false;

    if (value === null) return false;

    if (!("_envkist" in value)) return false;

    return true;
};

const createKindGuard = <T extends EnvValue["kind"]>(kind: T) => {
    return (
        value: unknown,
    ): value is Extract<
        EnvValue,
        {
            kind: T;
        }
    > => {
        if (!isAny(value)) return false;
        if (value.kind !== kind) return false;
        return true;
    };
};

const isString = createKindGuard("string");

const isNumber = createKindGuard("number");

const isBoolean = createKindGuard("boolean");

type IsFunctions = {
    any: typeof isAny;
    string: typeof isString;
    number: typeof isNumber;
    boolean: typeof isBoolean;
};

const is: IsFunctions = {
    any: isAny,
    string: isString,
    number: isNumber,
    boolean: isBoolean,
};

export type { IsFunctions };
export { is };
