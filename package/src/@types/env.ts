type EnvkistValueKind = "string" | "number" | "boolean";

type FallbackMap = {
    string: string;
    number: number;
    boolean: boolean;
};

type EnvkistValueBase<Kind extends EnvkistValueKind> = {
    __envkist: true;
    kind: Kind;
    name: string;
    fallback?: FallbackMap[Kind];
};

type EnvkistString = EnvkistValueBase<"string">;

type EnvkistNumber = EnvkistValueBase<"number">;

type EnvkistBoolean = EnvkistValueBase<"boolean">;

type EnvkistValue = EnvkistString | EnvkistNumber | EnvkistBoolean;

export type {
    EnvkistBoolean,
    EnvkistNumber,
    EnvkistString,
    EnvkistValue,
    EnvkistValueKind,
};
