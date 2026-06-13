import type { EnvValue } from "#/@types/env";

type InjectAccessor = (name: string) => string;

type InjectFunction = (value: EnvValue) => string;

type CreateInject = (accessor: InjectAccessor) => InjectFunction;

export type { CreateInject, InjectAccessor, InjectFunction };
