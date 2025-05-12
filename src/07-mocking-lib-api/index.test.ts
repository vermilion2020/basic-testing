import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

const get = jest.fn();

describe('throttledGetDataFromApi', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const url = '/todos';

  beforeEach(() => {
    (axios['create'] as jest.Mock) = jest.fn(() => ({
      get,
    }));
  });

  test('should create instance with provided base url', async () => {
    get.mockResolvedValue({ data: 'test' });
    jest.spyOn(axios, 'create');
    throttledGetDataFromApi(url);
    expect(axios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    get.mockResolvedValue({ data: 'test' });
    await throttledGetDataFromApi(url);
    expect(get).toHaveBeenCalledWith(url);
  });

  test('should return response data', async () => {
    get.mockResolvedValue({ data: 'test' });
    const result = await throttledGetDataFromApi(url);
    expect(result).toEqual('test');
  });
});
