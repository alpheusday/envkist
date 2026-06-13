import type { EnvValue, Infer } from "#/@types/env";

type ResolveAccessor = (name: string) => string | undefined;

type ResolveFunction = <T extends EnvValue>(value: T) => Infer<T>;

type CreateResolve = (accessor: ResolveAccessor) => ResolveFunction;

export type { CreateResolve, ResolveAccessor, ResolveFunction };
