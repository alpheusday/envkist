import type { EnvValue } from "envkist";

import { env } from "envkist";
import { describe, expect, it } from "vitest";

type InjectAccessor = (name: string) => string;

type InjectSpec = Readonly<{
    label: string;
    accessor: InjectAccessor;
    inject: (value: EnvValue) => string;
}>;

const testInject = (spec: InjectSpec): void => {
    const { label, accessor, inject } = spec;

    describe(`inject (${label})`, (): void => {
        describe("string kind", (): void => {
            it("returns env reference without fallback", (): void => {
                const result: string = inject(env.string("PORT"));

                expect(result).toBe(accessor("PORT"));
            });

            it("returns env reference with string fallback", (): void => {
                const result: string = inject(env.string("PORT", "3000"));

                expect(result).toBe(`(${accessor("PORT")} ?? "3000")`);
            });
        });

        describe("number kind", (): void => {
            it("returns Number.isNaN guarded reference without fallback", (): void => {
                const result: string = inject(env.number("PORT"));

                expect(result).toBe(
                    `(!Number.isNaN(Number(${accessor("PORT")})) ? Number(${accessor("PORT")}) : void 0)`,
                );
            });

            it("returns Number.isNaN guarded reference with number fallback", (): void => {
                const result: string = inject(env.number("PORT", 3000));

                expect(result).toBe(
                    `(!Number.isNaN(Number(${accessor("PORT")})) ? Number(${accessor("PORT")}) : 3000)`,
                );
            });
        });

        describe("boolean kind", (): void => {
            it("returns strict equality comparison without fallback", (): void => {
                const result: string = inject(env.boolean("FLAG"));

                expect(result).toBe(
                    `(${accessor("FLAG")} === "true" || ${accessor("FLAG")} === "1")`,
                );
            });

            it("returns ternary with boolean fallback (true)", (): void => {
                const result: string = inject(env.boolean("FLAG", true));

                expect(result).toBe(
                    `(${accessor("FLAG")} !== void 0 ? ${accessor("FLAG")} === "true" || ${accessor("FLAG")} === "1" : true)`,
                );
            });

            it("returns ternary with boolean fallback (false)", (): void => {
                const result: string = inject(env.boolean("FLAG", false));

                expect(result).toBe(
                    `(${accessor("FLAG")} !== void 0 ? ${accessor("FLAG")} === "true" || ${accessor("FLAG")} === "1" : false)`,
                );
            });
        });
    });
};

export type { InjectSpec };
export { testInject };
