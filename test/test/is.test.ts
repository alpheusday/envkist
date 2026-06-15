import { env, is } from "envkist";
import { describe, expect, it } from "vitest";

describe("is", (): void => {
    describe("any", (): void => {
        it("returns true for env.string", (): void => {
            expect(is.any(env.string("PORT"))).toBe(true);
        });

        it("returns true for env.number", (): void => {
            expect(is.any(env.number("PORT"))).toBe(true);
        });

        it("returns true for env.boolean", (): void => {
            expect(is.any(env.boolean("FLAG"))).toBe(true);
        });

        it("returns false for null", (): void => {
            expect(is.any(null)).toBe(false);
        });

        it("returns false for undefined", (): void => {
            expect(is.any(undefined)).toBe(false);
        });

        it("returns false for void 0", (): void => {
            expect(is.any(void 0)).toBe(false);
        });

        it("returns false for string primitive", (): void => {
            expect(is.any("string")).toBe(false);
        });

        it("returns false for number primitive", (): void => {
            expect(is.any(42)).toBe(false);
        });

        it("returns false for boolean primitive", (): void => {
            expect(is.any(true)).toBe(false);
        });

        it("returns false for plain object without _envkist", (): void => {
            expect(is.any({})).toBe(false);
        });

        it("returns false for object with _envkist set to false", (): void => {
            expect(
                is.any({
                    _envkist: false,
                }),
            ).toBe(false);
        });

        it("returns false for array", (): void => {
            expect(is.any([])).toBe(false);
        });
    });

    describe("string", (): void => {
        it("returns true for env.string without fallback", (): void => {
            expect(is.string(env.string("PORT"))).toBe(true);
        });

        it("returns true for env.string with fallback", (): void => {
            expect(is.string(env.string("PORT", "3000"))).toBe(true);
        });

        it("returns false for env.number", (): void => {
            expect(is.string(env.number("PORT"))).toBe(false);
        });

        it("returns false for env.boolean", (): void => {
            expect(is.string(env.boolean("FLAG"))).toBe(false);
        });

        it("returns false for null", (): void => {
            expect(is.string(null)).toBe(false);
        });

        it("returns false for undefined", (): void => {
            expect(is.string(undefined)).toBe(false);
        });

        it("returns false for void 0", (): void => {
            expect(is.string(void 0)).toBe(false);
        });

        it("returns false for string primitive", (): void => {
            expect(is.string("hello")).toBe(false);
        });

        it("returns false for plain object", (): void => {
            expect(is.string({})).toBe(false);
        });
    });

    describe("number", (): void => {
        it("returns true for env.number without fallback", (): void => {
            expect(is.number(env.number("PORT"))).toBe(true);
        });

        it("returns true for env.number with fallback", (): void => {
            expect(is.number(env.number("PORT", 3000))).toBe(true);
        });

        it("returns false for env.string", (): void => {
            expect(is.number(env.string("PORT"))).toBe(false);
        });

        it("returns false for env.boolean", (): void => {
            expect(is.number(env.boolean("FLAG"))).toBe(false);
        });

        it("returns false for null", (): void => {
            expect(is.number(null)).toBe(false);
        });

        it("returns false for undefined", (): void => {
            expect(is.number(undefined)).toBe(false);
        });

        it("returns false for void 0", (): void => {
            expect(is.number(void 0)).toBe(false);
        });

        it("returns false for number primitive", (): void => {
            expect(is.number(42)).toBe(false);
        });

        it("returns false for plain object", (): void => {
            expect(is.number({})).toBe(false);
        });
    });

    describe("boolean", (): void => {
        it("returns true for env.boolean without fallback", (): void => {
            expect(is.boolean(env.boolean("FLAG"))).toBe(true);
        });

        it("returns true for env.boolean with fallback", (): void => {
            expect(is.boolean(env.boolean("FLAG", true))).toBe(true);
        });

        it("returns false for env.string", (): void => {
            expect(is.boolean(env.string("FLAG"))).toBe(false);
        });

        it("returns false for env.number", (): void => {
            expect(is.boolean(env.number("FLAG"))).toBe(false);
        });

        it("returns false for null", (): void => {
            expect(is.boolean(null)).toBe(false);
        });

        it("returns false for undefined", (): void => {
            expect(is.boolean(undefined)).toBe(false);
        });

        it("returns false for void 0", (): void => {
            expect(is.boolean(void 0)).toBe(false);
        });

        it("returns false for boolean primitive", (): void => {
            expect(is.boolean(true)).toBe(false);
        });

        it("returns false for plain object", (): void => {
            expect(is.boolean({})).toBe(false);
        });
    });
});
