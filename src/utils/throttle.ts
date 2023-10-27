import { FunctionType } from "./types";

type ThrottleCallbackType<T extends FunctionType> = (...args: Parameters<T>) => void;

export function throttle<T extends FunctionType>(this: ThisParameterType<T>, func: T, interval: number = 0, callback?: (result: ReturnType<T>, ...args: Parameters<T>) => void): ThrottleCallbackType<T> {
	let isThrottled = false;
	let lastArgs: Parameters<T> | null = null;
	let timeoutId: number | undefined;
	let lastCallTimestamp = 0;

	return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
		if (!isThrottled) {
			isThrottled = true;

			if (Date.now() - lastCallTimestamp > interval) {
				clearTimeout(timeoutId);
				timeoutId = undefined;
			}

			if (!timeoutId) {
				const result = func.apply(this, args);
				callback && callback.apply(this, [result, ...args]);
			}

			timeoutId = setTimeout(() => {
				isThrottled = false;

				if (lastArgs !== null) {
					const result = func.apply(this, lastArgs);
					callback && callback.apply(this, [result, ...lastArgs]);
				}
			}, interval);
		} else {
			lastArgs = args;
		}

		lastCallTimestamp = Date.now();
	};
}