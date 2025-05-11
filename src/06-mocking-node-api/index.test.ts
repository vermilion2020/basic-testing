import path from 'path';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import fs from 'fs';

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
    path['join'] = jest.fn(() => 'test.txt');
    await readFileAsynchronously('test.txt');
    expect(path.join).toHaveBeenCalledWith(__dirname, 'test.txt');
  });

  test('should return null if file does not exist', async () => {
    fs['existsSync'] = jest.fn(() => false);
    const result = await readFileAsynchronously('test.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    fs['existsSync'] = jest.fn(() => true);
    const content = 'test';
    (fs.promises['readFile'] as jest.Mock) = jest.fn(async () =>
      Buffer.from(content),
    );
    const res = await readFileAsynchronously('test.txt');
    expect(res).toBe(content);
  });
});
