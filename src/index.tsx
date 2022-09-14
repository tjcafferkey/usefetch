import { useEffect, useReducer, useRef } from 'react';

import http from './http';
import { HttpOptions } from './types';

type ResponseStatus = 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR';

interface Props extends HttpOptions {
    shouldExecute?: boolean;
}

interface InitialState {
    status: ResponseStatus;
    error: any;
    responseData: any;
}

interface Response {
    status: ResponseStatus;
    data: any;
}

const useFetch = ( { url, config, shouldExecute } : Props ) : Response => {
    const cache = useRef( {} );

    const initialState: InitialState = {
        status: 'IDLE',
        error: null,
        responseData: [],
    };

    const [ state, dispatch ] = useReducer( ( state, action ) => {
        switch ( action.type ) {
        case 'LOADING':
            return { ...initialState, status: action.type };
        case 'SUCCESS':
            return { ...initialState, status: action.type, responseData: action.payload };
        case 'ERROR':
            return { ...initialState, status: action.type, error: action.payload };
        default:
            return state;
        }
    }, initialState );

    useEffect( () => {
        if ( ! url || shouldExecute === false ) {
            return;
        }

        const options: HttpOptions = {
            url,
            config,
        };

        async function handleRequest() {
            dispatch( { type: 'LOADING' } );
            if ( cache.current[url] ) {
                const cachedData = cache.current[url];
                dispatch( { type: 'SUCCESS', payload: cachedData } );
            } else {
                try {
                    const response = await http( options );
                    cache.current[url] = response;
                    dispatch( { type: 'SUCCESS', payload: response } );
                } catch( err ) {
                    console.log( err );
                    dispatch( { type: 'ERROR', payload: [] } );
                }
            }
        }

        handleRequest();
    }, [ url, config, shouldExecute ] );

    return { status: state.status, data: state.responseData };
};

export default useFetch;