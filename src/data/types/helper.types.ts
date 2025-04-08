export type ObtainTypeValues<T> = T[ObtainTypeKeys<T>];

export type ObtainTypeKeys<T> = keyof T;

export type Prettify<T> = { [K in keyof T]: T[K] } & {};
