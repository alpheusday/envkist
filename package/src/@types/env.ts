type EnvkistValueKind = "string" | "number" | "boolean";

type EnvkistMapFallback = {
    string: string;
    number: number;
    boolean: boolean;
};

type EnvkistMapResolved = Partial<EnvkistMapFallback>;

type EnvkistValueBase<Kind extends EnvkistValueKind> = {
    __envkist: true;
    kind: Kind;
    name: string;
    fallback?: EnvkistMapFallback[Kind];
};

type EnvkistString = EnvkistValueBase<"string">;

type EnvkistNumber = EnvkistValueBase<"number">;

type EnvkistBoolean = EnvkistValueBase<"boolean">;

type EnvkistValue = EnvkistString | EnvkistNumber | EnvkistBoolean;

type EnvkistValueResolved<T extends EnvkistValue> =
    EnvkistMapResolved[T["kind"]];

export type {
    EnvkistBoolean,
    EnvkistMapFallback,
    EnvkistMapResolved,
    EnvkistNumber,
    EnvkistString,
    EnvkistValue,
    EnvkistValueKind,
    EnvkistValueResolved,
};
