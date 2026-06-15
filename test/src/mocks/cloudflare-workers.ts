const env: Record<string, string | undefined> = {};

const resetEnv = (): void => {
    for (const key of Object.keys(env)) {
        delete env[key];
    }
};

export { env, resetEnv };
