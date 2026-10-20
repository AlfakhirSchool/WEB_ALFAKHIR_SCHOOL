/** Text overrides keyed by `overrideKey(scope, source)`. Shared by server store and client <T>. */
export type OverrideMap = Record<string, string>;
export const overrideKey = (scope: string, source: string) => `${scope}\u0000${source}`;
