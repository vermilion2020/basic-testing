import path from 'path';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();
    jest.spyOn(global, 'setTimeout');
    const timeout = 400;
    doStuffByTimeout(cb, timeout);
    jest.advanceTimersByTime(timeout);
    expect(setTimeout).toHaveBeenCalledWith(cb, timeout);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    const timeout = 300;
    doStuffByTimeout(cb, timeout);
    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const cb = jest.fn();
    jest.spyOn(global, 'setInterval');
    const timeout = 400;
    doStuffByInterval(cb, timeout);
    jest.advanceTimersByTime(timeout);
    expect(setInterval).toHaveBeenCalledWith(cb, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    const timeout = 200;
    const times = 3;
    doStuffByInterval(cb, timeout);
    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout * times);
    expect(cb).toHaveBeenCalledTimes(times);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');
    const pathToFile = 'test.txt';
    await readFileAsynchronously(pathToFile);
    expect(path.join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'test.txt';
    const res = await readFileAsynchronously(pathToFile);
    expect(res).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'test1.txt';
    const res = await readFileAsynchronously(pathToFile);
    expect(res).toBe('test');
  });
});
