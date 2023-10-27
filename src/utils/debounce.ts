import { FunctionType } from "./types";

export type DebounceCallbackType<T extends FunctionType> = (...args: Parameters<T>) => void;

export function debounce<T extends FunctionType>(this: ThisParameterType<T>, func: T, delay: number = 0, callback?: (result: ReturnType<T>, ...args: Parameters<T>) => void): DebounceCallbackType<T> {
	let timeoutId: number;

	return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			const result = func.apply(this, args);
			callback && callback.apply(this, [result, ...args]);
		}, delay);
	}
}