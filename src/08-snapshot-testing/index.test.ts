// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const res = generateLinkedList(['basic', 'testing', 'course']);
    expect(res).toStrictEqual({
      next: {
        next: {
          next: {
            next: null,
            value: null,
          },
          value: 'course',
        },
        value: 'testing',
      },
      value: 'basic',
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const res = generateLinkedList(['basic', 'testing', 'course']);
    expect(res).toMatchSnapshot();
  });
});
