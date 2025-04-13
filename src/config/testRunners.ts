// TODO at least I've tried
// import {
//   afterAll as jAfterAll,
//   beforeAll as jBeforeAll,
//   describe as jDescribe,
//   test as jTest,
//   beforeEach as jBeforeEach,
//   afterEach as jAfterEach,
// } from '@jest/globals';

// import {
//   before as wdioBeforeAll,
//   describe as wdioDescribe,
//   it as wdioTest,
//   after as wdioAfterAll,
//   afterEach as wdioAfterEach,
//   beforeEach as wdioBeforeEach,
// } from 'mocha';
// import { FRAMEWORK } from './environment';

// // const jestGlobals = (async () => {
// //   return FRAMEWORK === 'JEST' ? await import('@jest/globals') : null;
// // })();

// // const jestGlobals = FRAMEWORK === 'JEST' ? await import('@jest/globals') : null;

// const testFunctions = {
//   JEST: {
//     describe: jDescribe,
//     it: jTest,
//     before: jBeforeAll,
//     after: jAfterAll,
//     beforeEach: jBeforeEach,
//     afterEach: jAfterEach,
//     // describe: async () => (await import('@jest/globals')).describe,
//     // it: async () => (await import('@jest/globals')).test,
//     // before: async () => (await import('@jest/globals')).beforeAll,
//     // after: async () => (await import('@jest/globals')).afterAll,
//     // beforeEach: async () => (await import('@jest/globals')).beforeEach,
//     // afterEach: async () => (await import('@jest/globals')).afterEach,
//     // describe: jestGlobals?.describe,
//     // it: jestGlobals?.test,
//     // before: jestGlobals?.beforeAll,
//     // after: jestGlobals?.afterAll,
//     // beforeEach: jestGlobals?.beforeEach,
//     // afterEach: jestGlobals?.afterEach,
//   },
//   WDIO: {
//     describe: wdioDescribe,
//     it: wdioTest,
//     before: wdioBeforeAll,
//     after: wdioAfterAll,
//     beforeEach: wdioBeforeEach,
//     afterEach: wdioAfterEach,
//   },
// };

// const selectedFramework = (FRAMEWORK || 'WDIO') as 'WDIO' | 'JEST';

// export default testFunctions[selectedFramework];

// export default (() => {
//   const framework = testFunctions[selectedFramework];
//   return {
//     describe: framework.describe,
//     it: framework.it,
//     before: framework.before,
//     after: framework.after,
//     beforeEach: framework.beforeEach,
//     afterEach: framework.afterEach,
//   };
// })();

// export default (async () => {
//   const selectedFramework = (FRAMEWORK || 'WDIO') as 'WDIO' | 'JEST';
//   if (selectedFramework === 'JEST') {
//     return (await import('./runners/jestRunners')).default;
//   }
//   return (await import('./runners/wdioRunners')).default;
// })();

// const selectedFramework = (FRAMEWORK || 'WDIO') as 'WDIO' | 'JEST';

// type TestAPI = {
//   describe: (...args: any[]) => any;
//   it: (...args: any[]) => any;
//   before: (...args: any[]) => any;
//   after: (...args: any[]) => any;
//   beforeEach: (...args: any[]) => any;
//   afterEach: (...args: any[]) => any;
// };

// let testPromise: TestAPI;

// if (selectedFramework === 'JEST') {
//   testPromise = await import('./runners/jestRunners.ts').then((mod) => mod.default);
// } else {
//   testPromise = await import('./runners/wdioRunners.ts').then((mod) => mod.default);
// }

// export default testPromise;
