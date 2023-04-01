const chai = require('chai');

const { expect } = chai;
const { isNumber, moneyFormatter } = require('../../util');

describe('Test isNumber', async () => {
  const tests = [
    {
      name: 'number: 123 should be true',
      val: 123,
      expected: true,
    },
    {
      name: "string: 'abc' should be false",
      val: 'abc',
      expected: false,
    },
    {
      name: "string numeric: '123' should be false",
      val: '123',
      expected: false,
    },

    {
      name: 'boolean: true should be false',
      val: true,
      expected: false,
    },
    {
      name: 'boolean: false should be false',
      val: false,
      expected: false,
    },
    {
      name: 'array should be false',
      val: [],
      expected: false,
    },
    {
      name: 'object should be false',
      val: {},
      expected: false,
    },
    {
      name: 'NaN should be false',
      val: NaN,
      expected: false,
    },
    {
      name: 'null should be false',
      val: null,
      expected: false,
    },
    {
      name: 'undefined should be false',
      val: undefined,
      expected: false,
    },
  ];

  for (const t of tests) {
    it(t.name, async () => {
      const res = isNumber(t.val);
      expect(res).to.equal(t.expected);
    });
  }
});

describe('Test moneyFormatter', async () => {
  // valid input
  const tests = [
    {
      name: 'zero',
      val: 0,
      expected: '$0',
    },
    {
      name: 'positive number',
      val: 800,
      expected: '$800',
    },
    {
      name: 'negative number',
      val: -100,
      expected: '-$100',
    },
  ];

  for (const t of tests) {
    it(t.name, async () => {
      const res = moneyFormatter(t.val);
      expect(res).to.equal(t.expected);
    });
  }

  // invalid input
  const testErrors = [
    {
      name: 'string',
      val: 'abc',
    },
    {
      name: 'array',
      val: [],
    },
    {
      name: 'object',
      val: {},
    },
    {
      name: 'null',
      val: null,
    },
    {
      name: 'undefined',
      val: undefined,
    },
  ];

  for (const t of testErrors) {
    it(`${t.name} to throw error`, async () => {
      expect(() => moneyFormatter(t.val)).to.throw();
    });
  }
});
