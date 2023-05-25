// The code from: https://github.com/scopsy/await-to-js/blob/master/src/await-to-js.ts

/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
export async function to<T, U = Error>(
	promise: Promise<T>,
	errorExt?: Record<string, unknown>,
): Promise<[U, undefined] | [undefined, T]> {
	return promise
		.then<[undefined, T]>((data: T) => [null, data])
		.catch<[U, undefined]>((error: U) => {
		if (errorExt) {
			const parsedError = Object.assign({}, error, errorExt);
			return [parsedError, undefined];
		}

		return [error, undefined];
	});
}

export default to;
