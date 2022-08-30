import { HttpOptions } from "./types";
import { isObject, sanitizeObject } from './utils';

interface Options {
    method: string;
    [ key: string ]: any;
}

const keysToRemove = [ 'method', 'body' ];

export default async function http( { url, config } : HttpOptions ) {
    let options: Options = {
        method: 'GET',
    };

    if ( isObject( config ) ) {
        options = {
            ...options,
            ...sanitizeObject( config, keysToRemove ),
        }
    }

	const response = await fetch(
		url,
		{ ...options }
	);

	if ( ! response.ok ) {
		throw new Error(`HTTP Error! status: ${ response.status }`);
	}

    const contentTypeHeader = response.headers.get("Content-Type");

    if (contentTypeHeader?.toString().includes("application/json")) {
      return await response.json();
    }

    return response;
}