// Represents a nullable type.
export type Nullable<T> = T | null | undefined;

// Equivalent of keyof type, but for values.
export type ValueOf<T> = T[keyof T];

// Represents a numeric string type.
export type NumericalString = `${number}`;

