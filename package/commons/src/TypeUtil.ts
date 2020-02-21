/**
 * Makes all properties of a type recursively optional
 * @see https://stackoverflow.com/questions/41980195/recursive-partialt-in-typescript-2-1
 * @since TypeScript 2.8
 */
export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P]
};
