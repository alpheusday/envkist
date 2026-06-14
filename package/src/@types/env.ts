type EnvKind = "string" | "number" | "boolean";

type EnvKindMap = {
    string: string;
    number: number;
    boolean: boolean;
};

type EnvSchema<
    Kind extends EnvKind,
    Fallback extends EnvKindMap[Kind] | undefined = undefined,
> = Readonly<{
    _envkist: true;
    kind: Kind;
    name: string;
    fallback: Fallback;
}>;

type EnvString<
    // fallback
    Fallback extends string | undefined = undefined,
> = EnvSchema<"string", Fallback>;

type EnvNumber<
    // fallback
    Fallback extends number | undefined = undefined,
> = EnvSchema<"number", Fallback>;

type EnvBoolean<
    // fallback
    Fallback extends boolean | undefined = undefined,
> = EnvSchema<"boolean", Fallback>;

type EnvValue =
    | EnvString<string | undefined>
    | EnvNumber<number | undefined>
    | EnvBoolean<boolean | undefined>;

type Infer<T extends EnvValue> =
    T extends EnvSchema<infer K, infer F>
        ? F extends undefined
            ? EnvKindMap[K] | undefined
            : EnvKindMap[K]
        : never;

export type {
    EnvBoolean,
    EnvKind,
    EnvKindMap,
    EnvNumber,
    EnvSchema,
    EnvString,
    EnvValue,
    Infer,
};
