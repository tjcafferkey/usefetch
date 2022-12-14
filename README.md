# useFetch();

A super simple React hook for fetching and caching HTTP responses. This hook uses the browsers [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to make requests.

## Installation

```js
npm install @tjcafferkey/usefetch
```

## Usage

```js
import useFetch from '@tjcafferkey/usefetch';

const { data, status } = useFetch( {
    url: 'https://some-domain/api/v1/some-endpoint',
    shouldExecute: true // Optional: Defaults to true: true | false
} );

```

For a list of optional configation options please see the [MDN Fetch documentation](https://developer.mozilla.org/en-US/docs/Web/API/fetch). **All the options apply except `method` and `body`.**

### Response Schema

```js
{
    // `status` is a string representing the requests current state.
    status: 'LOADING', // 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR';

    // `data` is the response that was provided by the server
    data: {},
}
```