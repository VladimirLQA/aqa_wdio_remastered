import {
  afterAll as jAfterAll,
  beforeAll as jBeforeAll,
  describe as jDescribe,
  test as jTest,
  beforeEach as jBeforeEach,
  afterEach as jAfterEach,
} from '@jest/globals';

export const jest = {
  describe: jDescribe,
  it: jTest,
  before: jBeforeAll,
  after: jAfterAll,
  beforeEach: jBeforeEach,
  afterEach: jAfterEach,
};
