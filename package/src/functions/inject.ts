import type { EnvkistValue } from "#/@types/env";

const injectString = (name: string, fallback?: string): string => {
    const ref = `process.env.${name}`;

    if (fallback !== void 0) {
        return `(${ref} ?? "${fallback}")`;
    }

    return ref;
};

const injectNumber = (name: string, fallback?: number): string => {
    const ref = `process.env.${name}`;

    if (fallback !== void 0) {
        return `(!Number.isNaN(Number(${ref})) ? Number(${ref}) : ${fallback})`;
    }

    return `(!Number.isNaN(Number(${ref})) ? Number(${ref}) : void 0)`;
};

const injectBoolean = (name: string, fallback?: boolean): string => {
    const ref = `process.env.${name}`;

    if (fallback !== void 0) {
        return `(${ref} !== void 0 ? ${ref} === "true" || ${ref} === "1" : ${fallback})`;
    }

    return `(${ref} === "true" || ${ref} === "1")`;
};

const inject = (value: EnvkistValue): string => {
    if (value.kind === "string") {
        return injectString(value.name, value.fallback);
    }

    if (value.kind === "number") {
        return injectNumber(value.name, value.fallback);
    }

    if (value.kind === "boolean") {
        return injectBoolean(value.name, value.fallback);
    }

    throw new Error(`Unknown value kind: ${JSON.stringify(value)}`);
};

export { inject };
