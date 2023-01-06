import { useRef, useReducer, useCallback } from 'react';

/**
 * @typedef UseFetchState
 * @property {string | null} error
 * @property {object | string | null} data
 * @property {boolean} loading
 */

/**
 * @typedef {function} FetchDataFunction
 * @param {string} url
 * @param {boolean} [useCache=true]
 * @param {string} [method='GET']
 * @param {object} body
 */

/**
 * @description useFetch - Use Fetch Hook
 * @returns {[UseFetchState, FetchDataFunction]}
 */
export const useFetch = () => {
  const cache = useRef({});

  /** @type UseFetchState */
  const initialState = {
    error: null,
    data: null,
    loading: false
  };

  /**
   * @description Use Fetch Hook's internal state
   * @type {[UseFetchState, React.DispatchWithoutAction]}
   */
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'FETCHING':
        return { ...initialState, loading: true };
      case 'FETCHED':
        return { ...initialState, loading: false, data: action.payload };
      case 'FETCH_ERROR':
        return { ...initialState, loading: false, error: action.payload };
      default:
        return state;
    }
  }, initialState);

  /**
   * @description getDataFromResponse - Extracts the response body depending on the content-type of the response.
   * @param {Response} response
   * @returns {object | string}
   */
  const getDataFromResponse = (response) => {
    if (!response.headers) throw new Error('There was an error with the request.');
    const contentType = response.headers.get('content-type');
    if (response.status !== 200) throw new Error('There was an error with the request.');
    if (contentType === null) return Promise.resolve(null);
    else if (contentType.startsWith('application/json;')) return response.json();
    else if (contentType.startsWith('text/plain;')) return response.text();
    else throw new Error(`Unsupported response content-type: ${contentType}`);
  };

  /**
   * @type {FetchDataFunction}
   */
  const fetchData = useCallback(async (url, useCache = true, method = 'GET', body) => {
    let cancelRequest = false;
    if (!url || !url.trim()) return;
    dispatch({ type: 'FETCHING' });
    if (useCache && cache.current[url]) {
      const data = cache.current[url];
      dispatch({ type: 'FETCHED', payload: data });
    } else {
      try {
        const requestOptions = {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          ...(body && { body })
        };

        const response = await fetch(url, requestOptions);
        const data = await getDataFromResponse(response);
        cache.current[url] = data;
        if (cancelRequest) return;
        dispatch({ type: 'FETCHED', payload: data });
      } catch (error) {
        if (cancelRequest) return;
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    }

    return () => {
      cancelRequest = true;
    };
  }, []);

  return [state, fetchData];
};
