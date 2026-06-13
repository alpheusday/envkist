import { env, inject } from "envkist";
import { describe, expect, it } from "vitest";

describe("inject", (): void => {
    describe("string kind", (): void => {
        it("returns process.env reference without fallback", (): void => {
            const result: string = inject(env.string("PORT"));

            expect(result).toBe("process.env.PORT");
        });

        it("returns process.env reference with string fallback", (): void => {
            const result: string = inject(env.string("PORT", "3000"));

            expect(result).toBe('(process.env.PORT ?? "3000")');
        });
    });

    describe("number kind", (): void => {
        it("returns Number.isNaN guarded reference without fallback", (): void => {
            const result: string = inject(env.number("PORT"));

            expect(result).toBe(
                "(!Number.isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) : void 0)",
            );
        });

        it("returns Number.isNaN guarded reference with number fallback", (): void => {
            const result: string = inject(env.number("PORT", 3000));

            expect(result).toBe(
                "(!Number.isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) : 3000)",
            );
        });
    });

    describe("boolean kind", (): void => {
        it("returns strict equality comparison without fallback", (): void => {
            const result: string = inject(env.boolean("FLAG"));

            expect(result).toBe(
                '(process.env.FLAG === "true" || process.env.FLAG === "1")',
            );
        });

        it("returns ternary with boolean fallback (true)", (): void => {
            const result: string = inject(env.boolean("FLAG", true));

            expect(result).toBe(
                '(process.env.FLAG !== void 0 ? process.env.FLAG === "true" || process.env.FLAG === "1" : true)',
            );
        });

        it("returns ternary with boolean fallback (false)", (): void => {
            const result: string = inject(env.boolean("FLAG", false));

            expect(result).toBe(
                '(process.env.FLAG !== void 0 ? process.env.FLAG === "true" || process.env.FLAG === "1" : false)',
            );
        });
    });
});
