export type {
    EnvBoolean,
    EnvKind,
    EnvKindMap,
    EnvNumber,
    EnvSchema,
    EnvString,
    EnvValue,
    Infer,
} from "#/@types/env";
export type { InjectFunction } from "#/@types/inject";
export type { ResolveFunction } from "#/@types/resolve";
export type { EnvFunctions } from "#/functions/env";
export type { IsFunctions } from "#/functions/is";

export { env } from "#/functions/env";
export { is } from "#/functions/is";
export { inject } from "#/modules/node/inject";
export { resolve } from "#/modules/node/resolve";
