export function isObject( obj ) : boolean {
    return obj instanceof Object && obj.constructor === Object;
}

export function sanitizeObject( obj: any, excludedKeys: string[] ) {
    if ( ! isObject( obj ) ) {
        return {};
    }

    const clone = { ...obj };

    excludedKeys.forEach( ( key ) => {
        delete clone[key];
    } );

    return clone;
}