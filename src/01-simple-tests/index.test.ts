import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const res = simpleCalculator({ a: 3, b: 4, action: Action.Add });
    expect(res).toBe(7);
  });

  test('should subtract two numbers', () => {
    const res = simpleCalculator({ a: 8, b: 2, action: Action.Subtract });
    expect(res).toBe(6);
  });

  test('should multiply two numbers', () => {
    const res = simpleCalculator({ a: 6, b: 2, action: Action.Multiply });
    expect(res).toBe(12);
  });

  test('should divide two numbers', () => {
    const res = simpleCalculator({ a: 10, b: 2, action: Action.Divide });
    expect(res).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    const res = simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate });
    expect(res).toBe(8);
  });

  test('should return null for invalid action', () => {
    const res = simpleCalculator({ a: 8, b: 2, action: 'Invalid action' });
    expect(res).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const res = simpleCalculator({ a: '', b: true, action: Action.Add });
    expect(res).toBe(null);
  });
});
