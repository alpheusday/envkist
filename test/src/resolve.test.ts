import { env, resolve } from "envkist";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("resolve", (): void => {
    const originalEnv = process.env;

    beforeEach((): void => {
        process.env = {
            ...originalEnv,
        };
    });

    afterEach((): void => {
        process.env = originalEnv;
    });

    describe("string kind", (): void => {
        it("returns undefined when env var is missing and no fallback", (): void => {
            delete process.env.PORT;

            const result: string | undefined = resolve(env.string("PORT"));

            expect(result).toBeUndefined();
        });

        it("returns fallback when env var is missing", (): void => {
            delete process.env.PORT;

            const result: string = resolve(env.string("PORT", "3000"));

            expect(result).toBe("3000");
        });

        it("returns env var value when present", (): void => {
            process.env.PORT = "8080";

            const result: string | undefined = resolve(env.string("PORT"));

            expect(result).toBe("8080");
        });

        it("returns env var value over fallback when present", (): void => {
            process.env.PORT = "8080";

            const result: string = resolve(env.string("PORT", "3000"));

            expect(result).toBe("8080");
        });
    });

    describe("number kind", (): void => {
        it("returns undefined when env var is missing and no fallback", (): void => {
            delete process.env.PORT;

            const result: number | undefined = resolve(env.number("PORT"));

            expect(result).toBeUndefined();
        });

        it("returns fallback when env var is missing", (): void => {
            delete process.env.PORT;

            const result: number = resolve(env.number("PORT", 3000));

            expect(result).toBe(3000);
        });

        it("returns parsed number when env var is present", (): void => {
            process.env.PORT = "8080";

            const result: number | undefined = resolve(env.number("PORT"));

            expect(result).toBe(8080);
        });

        it("returns parsed number over fallback when env var is present", (): void => {
            process.env.PORT = "8080";

            const result: number = resolve(env.number("PORT", 3000));

            expect(result).toBe(8080);
        });

        it("returns undefined when env var is not a valid number and no fallback", (): void => {
            process.env.PORT = "not-a-number";

            const result: number | undefined = resolve(env.number("PORT"));

            expect(result).toBeUndefined();
        });

        it("returns fallback when env var is not a valid number", (): void => {
            process.env.PORT = "not-a-number";

            const result: number = resolve(env.number("PORT", 3000));

            expect(result).toBe(3000);
        });
    });

    describe("boolean kind", (): void => {
        it("returns undefined when env var is missing and no fallback", (): void => {
            delete process.env.FLAG;

            const result: boolean | undefined = resolve(env.boolean("FLAG"));

            expect(result).toBeUndefined();
        });

        it("returns fallback when env var is missing", (): void => {
            delete process.env.FLAG;

            const result: boolean = resolve(env.boolean("FLAG", true));

            expect(result).toBe(true);
        });

        it("returns true when env var is 'true'", (): void => {
            process.env.FLAG = "true";

            const result: boolean | undefined = resolve(env.boolean("FLAG"));

            expect(result).toBe(true);
        });

        it("returns false when env var is 'false'", (): void => {
            process.env.FLAG = "false";

            const result: boolean | undefined = resolve(env.boolean("FLAG"));

            expect(result).toBe(false);
        });

        it("returns false when env var is not 'true'", (): void => {
            process.env.FLAG = "yes";

            const result: boolean | undefined = resolve(env.boolean("FLAG"));

            expect(result).toBe(false);
        });

        it("returns env var value over fallback when present", (): void => {
            process.env.FLAG = "true";

            const result: boolean = resolve(env.boolean("FLAG", false));

            expect(result).toBe(true);
        });
    });
});
