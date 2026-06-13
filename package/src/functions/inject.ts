import type { EnvValue } from "#/@types/env";
import type {
    CreateInject,
    InjectAccessor,
    InjectFunction,
} from "#/@types/inject";

const injectString = (
    accessor: InjectAccessor,
    name: string,
    fallback?: string,
): string => {
    const ref = accessor(name);

    if (fallback !== void 0) {
        return `(${ref} ?? "${fallback}")`;
    }

    return ref;
};

const injectNumber = (
    accessor: InjectAccessor,
    name: string,
    fallback?: number,
): string => {
    const ref = accessor(name);

    if (fallback !== void 0) {
        return `(!Number.isNaN(Number(${ref})) ? Number(${ref}) : ${fallback})`;
    }

    return `(!Number.isNaN(Number(${ref})) ? Number(${ref}) : void 0)`;
};

const injectBoolean = (
    accessor: InjectAccessor,
    name: string,
    fallback?: boolean,
): string => {
    const ref = accessor(name);

    if (fallback !== void 0) {
        return `(${ref} !== void 0 ? ${ref} === "true" || ${ref} === "1" : ${fallback})`;
    }

    return `(${ref} === "true" || ${ref} === "1")`;
};

const createInject: CreateInject = (
    accessor: InjectAccessor,
): InjectFunction => {
    return (value: EnvValue): string => {
        if (value.kind === "string") {
            return injectString(accessor, value.name, value.fallback);
        }

        if (value.kind === "number") {
            return injectNumber(accessor, value.name, value.fallback);
        }

        if (value.kind === "boolean") {
            return injectBoolean(accessor, value.name, value.fallback);
        }

        throw new Error(`Unknown value kind: ${JSON.stringify(value)}`);
    };
};

export { createInject };
