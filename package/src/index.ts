export type {
    EnvkistBoolean,
    EnvkistMapFallback,
    EnvkistMapResolved,
    EnvkistNumber,
    EnvkistString,
    EnvkistValue,
    EnvkistValueKind,
} from "#/@types/env";
export type { EnvkistFunctions } from "#/functions/env";
export type { IsFunctions } from "#/functions/is";

export { env, env as e } from "#/functions/env";
export { inject } from "#/functions/inject";
export { is } from "#/functions/is";
export { resolve } from "#/functions/resolve";
