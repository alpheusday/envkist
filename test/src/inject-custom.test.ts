import { env } from "envkist";
import { createInject } from "envkist/internal/functions/inject";
import { describe, expect, it } from "vitest";

describe("createInject", (): void => {
    const customAccessor = (name: string): string => `custom.${name}`;

    describe("string kind", (): void => {
        it("returns custom accessor reference without fallback", (): void => {
            const inject = createInject(customAccessor);
            const result: string = inject(env.string("PORT"));

            expect(result).toBe("custom.PORT");
        });

        it("returns custom accessor reference with string fallback", (): void => {
            const inject = createInject(customAccessor);
            const result: string = inject(env.string("PORT", "3000"));

            expect(result).toBe('(custom.PORT ?? "3000")');
        });
    });

    describe("number kind", (): void => {
        it("returns Number.isNaN guarded reference without fallback", (): void => {
            const inject = createInject(customAccessor);
            const result: string = inject(env.number("PORT"));

            expect(result).toBe(
                "(!Number.isNaN(Number(custom.PORT)) ? Number(custom.PORT) : void 0)",
            );
        });

        it("returns Number.isNaN guarded reference with number fallback", (): void => {
            const inject = createInject(customAccessor);
            const result: string = inject(env.number("PORT", 3000));

            expect(result).toBe(
                "(!Number.isNaN(Number(custom.PORT)) ? Number(custom.PORT) : 3000)",
            );
        });
    });

    describe("boolean kind", (): void => {
        it("returns strict equality comparison without fallback", (): void => {
            const inject = createInject(customAccessor);
            const result: string = inject(env.boolean("FLAG"));

            expect(result).toBe(
                '(custom.FLAG === "true" || custom.FLAG === "1")',
            );
        });

        it("returns ternary with boolean fallback (true)", (): void => {
            const inject = createInject(customAccessor);
            const result: string = inject(env.boolean("FLAG", true));

            expect(result).toBe(
                '(custom.FLAG !== void 0 ? custom.FLAG === "true" || custom.FLAG === "1" : true)',
            );
        });

        it("returns ternary with boolean fallback (false)", (): void => {
            const inject = createInject(customAccessor);
            const result: string = inject(env.boolean("FLAG", false));

            expect(result).toBe(
                '(custom.FLAG !== void 0 ? custom.FLAG === "true" || custom.FLAG === "1" : false)',
            );
        });
    });
});
