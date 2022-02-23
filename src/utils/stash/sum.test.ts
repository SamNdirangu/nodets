import sum from "./sum";

describe('Utils Fucntion tests', () => {
    test('Sum of 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });
});