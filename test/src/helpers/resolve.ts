import type { ResolveFunction } from "envkist/internal/@types/resolve";

import { env } from "envkist";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

const STRING_PRESENT = "DATABASE_URL";
const STRING_MISSING = "MISSING_STRING";
const NUMBER_PRESENT = "MAX_RETRIES";
const NUMBER_MISSING = "MISSING_NUMBER";
const BOOLEAN_PRESENT = "ENABLE_CORS";
const BOOLEAN_MISSING = "MISSING_BOOLEAN";

const EXPECTED_STRING = "postgresql://db:5432/app";
const EXPECTED_NUMBER = 3;

const INITIAL_ENV: Record<string, string> = {
    [STRING_PRESENT]: EXPECTED_STRING,
    [NUMBER_PRESENT]: String(EXPECTED_NUMBER),
    [BOOLEAN_PRESENT]: "true",
};

type ResolveTestEnvControl = {
    get: (name: string) => string | undefined;
    set: (name: string, value: string | undefined) => void;
};

type ResolveSpec = Readonly<{
    label: string;
    envControl: ResolveTestEnvControl;
    resolve: ResolveFunction;
}>;

const testResolve = (spec: ResolveSpec): void => {
    const { label, envControl, resolve } = spec;

    describe(`resolve (${label})`, (): void => {
        beforeEach((): void => {
            for (const [key, value] of Object.entries(INITIAL_ENV)) {
                envControl.set(key, value);
            }
        });

        afterEach((): void => {
            for (const key of Object.keys(INITIAL_ENV)) {
                envControl.set(key, undefined);
            }
        });

        describe("string kind", (): void => {
            it("returns undefined when env var is missing and no fallback", (): void => {
                envControl.set(STRING_MISSING, undefined);

                const result: string | undefined = resolve(
                    env.string(STRING_MISSING),
                );

                expect(result).toBeUndefined();
            });

            it("returns fallback when env var is missing", (): void => {
                envControl.set(STRING_MISSING, undefined);

                const result: string = resolve(
                    env.string(STRING_MISSING, "fallback-secret"),
                );

                expect(result).toBe("fallback-secret");
            });

            it("returns env var value when present", (): void => {
                const result: string | undefined = resolve(
                    env.string(STRING_PRESENT),
                );

                expect(result).toBe(EXPECTED_STRING);
            });

            it("returns env var value over fallback when present", (): void => {
                const result: string = resolve(
                    env.string(STRING_PRESENT, "fallback-value"),
                );

                expect(result).toBe(EXPECTED_STRING);
            });
        });

        describe("number kind", (): void => {
            it("returns undefined when env var is missing and no fallback", (): void => {
                envControl.set(NUMBER_MISSING, undefined);

                const result: number | undefined = resolve(
                    env.number(NUMBER_MISSING),
                );

                expect(result).toBeUndefined();
            });

            it("returns fallback when env var is missing", (): void => {
                envControl.set(NUMBER_MISSING, undefined);

                const result: number = resolve(
                    env.number(NUMBER_MISSING, 5000),
                );

                expect(result).toBe(5000);
            });

            it("returns parsed number when env var is present", (): void => {
                const result: number | undefined = resolve(
                    env.number(NUMBER_PRESENT),
                );

                expect(result).toBe(EXPECTED_NUMBER);
            });

            it("returns parsed number over fallback when env var is present", (): void => {
                const result: number = resolve(env.number(NUMBER_PRESENT, 5));

                expect(result).toBe(EXPECTED_NUMBER);
            });

            it("returns undefined when env var is not a valid number and no fallback", (): void => {
                envControl.set(NUMBER_PRESENT, "not-a-number");

                const result: number | undefined = resolve(
                    env.number(NUMBER_PRESENT),
                );

                expect(result).toBeUndefined();
            });

            it("returns fallback when env var is not a valid number", (): void => {
                envControl.set(NUMBER_PRESENT, "not-a-number");

                const result: number = resolve(env.number(NUMBER_PRESENT, 5));

                expect(result).toBe(5);
            });
        });

        describe("boolean kind", (): void => {
            it("returns undefined when env var is missing and no fallback", (): void => {
                envControl.set(BOOLEAN_MISSING, undefined);

                const result: boolean | undefined = resolve(
                    env.boolean(BOOLEAN_MISSING),
                );

                expect(result).toBeUndefined();
            });

            it("returns fallback when env var is missing", (): void => {
                envControl.set(BOOLEAN_MISSING, undefined);

                const result: boolean = resolve(
                    env.boolean(BOOLEAN_MISSING, true),
                );

                expect(result).toBe(true);
            });

            it("returns true when env var is 'true'", (): void => {
                const result: boolean | undefined = resolve(
                    env.boolean(BOOLEAN_PRESENT),
                );

                expect(result).toBe(true);
            });

            it("returns true when env var is '1'", (): void => {
                envControl.set(BOOLEAN_MISSING, "1");

                const result: boolean | undefined = resolve(
                    env.boolean(BOOLEAN_MISSING),
                );

                expect(result).toBe(true);
            });

            it("returns false when env var is 'false'", (): void => {
                envControl.set(BOOLEAN_PRESENT, "false");

                const result: boolean | undefined = resolve(
                    env.boolean(BOOLEAN_PRESENT),
                );

                expect(result).toBe(false);
            });

            it("returns false when env var is not 'true' or '1'", (): void => {
                envControl.set(BOOLEAN_PRESENT, "yes");

                const result: boolean | undefined = resolve(
                    env.boolean(BOOLEAN_PRESENT),
                );

                expect(result).toBe(false);
            });

            it("returns env var value over fallback when present", (): void => {
                const result: boolean = resolve(
                    env.boolean(BOOLEAN_PRESENT, false),
                );

                expect(result).toBe(true);
            });
        });
    });
};

export type { ResolveSpec, ResolveTestEnvControl };
export { testResolve };
