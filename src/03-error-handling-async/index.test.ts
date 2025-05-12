import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const res = await resolveValue(true);
    expect(res).toBe(true);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'Error Message';
    const res = () => throwError(message);
    expect(res).toThrow(message);
  });

  test('should throw error with default message if message is not provided', () => {
    const res = () => throwError();
    expect(res).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const res = () => throwCustomError();
    expect(res).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
