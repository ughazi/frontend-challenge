import { renderHook } from '@testing-library/react-hooks/dom';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { useFetch } from './useFetch.hook';

function fetchMock() {
  return new Promise((resolve) => {
    resolve({
      headers: new Headers({
        'content-type': 'application/json;'
      }),
      status: 200,
      json: () => Promise.resolve({ result: 'mock result' })
    });
  });
}

function fetchFailedMock() {
  return new Promise((resolve) => {
    resolve({
      headers: new Headers({
        'content-type': 'application/json;'
      }),
      status: 400
    });
  });
}

describe('useFetch.hook.js', () => {
  let domContainer = null;

  beforeAll(() => {
    jest.spyOn(window, 'fetch').mockImplementation(fetchMock);
  });

  afterAll(() => {
    global.fetch.mockClear();
  });

  beforeEach(() => {
    domContainer = document.createElement('div');
    document.body.appendChild(domContainer);
  });

  afterEach(() => {
    unmountComponentAtNode(domContainer);
    domContainer.remove();
    domContainer = null;
  });

  it('returns result of a successfull api call', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch());
    const fetchData = result.current[1];
    await act(async () => {
      fetchData('/abc', false, 'GET');
      await waitForNextUpdate();

      const { data } = result.current[0];
      expect(data).toEqual({ result: 'mock result' });
    });
  });

  it('returns error of a unsuccessfull api call', async () => {
    jest.spyOn(window, 'fetch').mockImplementation(fetchFailedMock);

    const { result, waitForNextUpdate } = renderHook(() => useFetch());
    const fetchData = result.current[1];
    await act(async () => {
      fetchData('/abc', false, 'GET');
      await waitForNextUpdate();

      const { error } = result.current[0];
      expect(error).toEqual('There was an error with the request.');
    });
  });

  it('returns loading state of an inflight api call', async () => {
    const { result } = renderHook(() => useFetch());
    const fetchData = result.current[1];
    act(async () => {
      fetchData('/abc', false, 'GET');
    });
    const { loading } = result.current[0];
    expect(loading).toEqual(true);
  });
});
