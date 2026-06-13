import { env } from "envkist";
import { createResolve } from "envkist/internal/functions/resolve";
import { afterEach, describe, expect, it } from "vitest";

describe("createResolve", (): void => {
    const mockEnv: Record<string, string> = {};

    const customAccessor = (name: string): string | undefined => {
        return mockEnv[name];
    };

    afterEach((): void => {
        for (const key of Object.keys(mockEnv)) {
            delete mockEnv[key];
        }
    });

    describe("string kind", (): void => {
        it("returns undefined when env var is missing and no fallback", (): void => {
            const resolve = createResolve(customAccessor);
            const result: string | undefined = resolve(env.string("PORT"));

            expect(result).toBeUndefined();
        });

        it("returns fallback when env var is missing", (): void => {
            const resolve = createResolve(customAccessor);
            const result: string = resolve(env.string("PORT", "3000"));

            expect(result).toBe("3000");
        });

        it("returns env var value when present", (): void => {
            mockEnv.PORT = "8080";
            const resolve = createResolve(customAccessor);
            const result: string | undefined = resolve(env.string("PORT"));

            expect(result).toBe("8080");
        });

        it("returns env var value over fallback when present", (): void => {
            mockEnv.PORT = "8080";
            const resolve = createResolve(customAccessor);
            const result: string = resolve(env.string("PORT", "3000"));

            expect(result).toBe("8080");
        });
    });

    describe("number kind", (): void => {
        it("returns undefined when env var is missing and no fallback", (): void => {
            const resolve = createResolve(customAccessor);
            const result: number | undefined = resolve(env.number("PORT"));

            expect(result).toBeUndefined();
        });

        it("returns fallback when env var is missing", (): void => {
            const resolve = createResolve(customAccessor);
            const result: number = resolve(env.number("PORT", 3000));

            expect(result).toBe(3000);
        });

        it("returns parsed number when env var is present", (): void => {
            mockEnv.PORT = "8080";
            const resolve = createResolve(customAccessor);
            const result: number | undefined = resolve(env.number("PORT"));

            expect(result).toBe(8080);
        });

        it("returns parsed number over fallback when env var is present", (): void => {
            mockEnv.PORT = "8080";
            const resolve = createResolve(customAccessor);
            const result: number = resolve(env.number("PORT", 3000));

            expect(result).toBe(8080);
        });

        it("returns undefined when env var is not a valid number and no fallback", (): void => {
            mockEnv.PORT = "not-a-number";
            const resolve = createResolve(customAccessor);
            const result: number | undefined = resolve(env.number("PORT"));

            expect(result).toBeUndefined();
        });

        it("returns fallback when env var is not a valid number", (): void => {
            mockEnv.PORT = "not-a-number";
            const resolve = createResolve(customAccessor);
            const result: number = resolve(env.number("PORT", 3000));

            expect(result).toBe(3000);
        });
    });

    describe("boolean kind", (): void => {
        it("returns undefined when env var is missing and no fallback", (): void => {
            const resolve = createResolve(customAccessor);
            const result: boolean | undefined = resolve(env.boolean("FLAG"));

            expect(result).toBeUndefined();
        });

        it("returns fallback when env var is missing", (): void => {
            const resolve = createResolve(customAccessor);
            const result: boolean = resolve(env.boolean("FLAG", true));

            expect(result).toBe(true);
        });

        it("returns true when env var is 'true'", (): void => {
            mockEnv.FLAG = "true";
            const resolve = createResolve(customAccessor);
            const result: boolean | undefined = resolve(env.boolean("FLAG"));

            expect(result).toBe(true);
        });

        it("returns false when env var is 'false'", (): void => {
            mockEnv.FLAG = "false";
            const resolve = createResolve(customAccessor);
            const result: boolean | undefined = resolve(env.boolean("FLAG"));

            expect(result).toBe(false);
        });

        it("returns false when env var is not 'true'", (): void => {
            mockEnv.FLAG = "yes";
            const resolve = createResolve(customAccessor);
            const result: boolean | undefined = resolve(env.boolean("FLAG"));

            expect(result).toBe(false);
        });

        it("returns env var value over fallback when present", (): void => {
            mockEnv.FLAG = "true";
            const resolve = createResolve(customAccessor);
            const result: boolean = resolve(env.boolean("FLAG", false));

            expect(result).toBe(true);
        });
    });
});
