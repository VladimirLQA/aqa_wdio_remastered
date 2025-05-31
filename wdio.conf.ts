import { rimraf } from 'rimraf';
import { globalAuthSetup } from './src/config/global-setup';
import { BAIL, HEADLESS, MAX_INSTANCES } from './src/config/environment';
import { TAGS } from './src/utils/tags';
import path from 'node:path';
import { addCustomCommands } from './src/utils/custom-matchers';
import logger from './src/utils/logger';
import { createGrepPattern } from './src/utils/helpers';
import './src/fixtures/base.fixture';

export const config: WebdriverIO.Config = {
  // for selenium grid
  protocol: 'http',
  hostname: 'localhost',
  port: 4444,
  path: '/wd/hub',
  runner: 'local',
  // ---

  tsConfigPath: './tsconfig.json',

  specs: ['./src/**/*.test.ts'],

  exclude: [
    // 'path/to/excluded/files'
  ],
  suites: {
    ui_products: ['./src/ui/tests/**/create.test.ts'],
    ui_simple: ['./src/ui/tests/baseTests/**/*.test.ts'],
    api_products: ['./src/api/tests/**/*.test.ts'],
    serial: ['./src/api/tests/**/smoke.test.ts'],
    single: ['./src/ui/tests/**/registration.*.ts'],
  },
  maxInstances: +MAX_INSTANCES || 5,

  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: [
          ...(HEADLESS === 'true' ? ['--headless'] : []),
          '--no-sandbox',
          '--disable-gpu',
          '--window-size=1280,800',
          '--disable-dev-shm-usage',
        ],
      },
      webSocketUrl: true,
      platformName: 'mac',
    },
  ],

  // capabilities: [
  //   {
  //     browserName: 'chrome',
  //     'goog:chromeOptions': {
  //       args: [
  //         ...(HEADLESS === 'true' ? ['--headless'] : []),
  //         '--no-sandbox',
  //         '--disable-gpu',
  //         '--window-size=1280,800',
  //       ],
  //     },
  //     webSocketUrl: true,
  //   },
  // ],

  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: 'error',

  bail: BAIL === 'true' ? 1 : 0,

  baseUrl: 'http://localhost:8080',

  waitforTimeout: 10000,

  connectionRetryTimeout: 120000,

  connectionRetryCount: 3,

  services: [
    'intercept',
    [
      'visual',
      {
        baselineFolder: path.join(process.cwd(), 'tests-screenshots', 'baseline'),
        formatImageName: '{tag}-{logName}-{width}x{height}',
        screenshotPath: path.join(process.cwd(), 'tmp'),
        savePerInstance: true,
        autoSaveBaseline: true,
      },
    ],
  ],
  framework: 'mocha',

  // The number of times to retry the entire specfile when it fails as a whole
  // specFileRetries: 1,

  // Delay in seconds between the spec file retry attempts
  // specFileRetriesDelay: 0,

  // Whether or not retried spec files should be retried immediately or deferred to the end of the queue
  // specFileRetriesDeferred: false,

  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        disableMochaHooks: false,
      },
    ],
  ],

  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    ui: 'bdd',
    timeout: 160000,
    grep: createGrepPattern(['--tag', '-t']),
  },

  /**
   * Gets executed once before all workers get launched.
   * @param {object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  onPrepare: function (config, capabilities) {
    rimraf.sync('./allure-results');
  },
  /**
   * Gets executed before a worker process is spawned and can be used to initialize specific service
   * for that worker as well as modify runtime environments in an async fashion.
   * @param  {string} cid      capability id (e.g 0-0)
   * @param  {object} caps     object containing capabilities for session that will be spawn in the worker
   * @param  {object} specs    specs to be run in the worker process
   * @param  {object} args     object that will be merged with the main configuration once worker is initialized
   * @param  {object} execArgv list of string arguments passed to the worker process
   */
  // onWorkerStart: function (cid, caps, specs, args, execArgv) {
  // },
  /**
   * Gets executed just after a worker process has exited.
   * @param  {string} cid      capability id (e.g 0-0)
   * @param  {number} exitCode 0 - success, 1 - fail
   * @param  {object} specs    specs to be run in the worker process
   * @param  {number} retries  number of retries used
   */
  // onWorkerEnd: function (cid, exitCode, specs, retries) {
  // },
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   * @param {string} cid worker id (e.g. 0-0)
   */
  // beforeSession: function (config, capabilities, specs, cid) {
  // },
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs        List of spec file paths that are to be run
   * @param {object}         browser      instance of created browser/device session
   */
  before: async function (capabilities, specs) {
    addCustomCommands(); // initialize custom commands
    await browser.maximizeWindow();
  },
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {string} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  // beforeCommand: function (commandName, args) {
  // },
  /**
   * Hook that gets executed before the suite starts
   * @param {object} suite suite details
   */
  beforeSuite: async function (suite) {
    if (suite.fullTitle.includes(TAGS.GLOBAL_SETUP)) await globalAuthSetup();
    logger.info(`TEST SUITE STARTS: ${suite.fullTitle}`);
  },
  /**
   * Function to be executed before a test (in Mocha/Jasmine) starts.
   */
  beforeTest: function (test, context) {
    logger.info(`TEST STARTS: ${test.title}`);
  },
  /**
   * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
   * beforeEach in Mocha)
   */
  // beforeHook: function (test, context, hookName) {
  // },
  /**
   * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
   * afterEach in Mocha)
   */
  // afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
  // },
  /**
   * Function to be executed after a test (in Mocha/Jasmine only)
   * @param {object}  test             test object
   * @param {object}  context          scope object the test was executed with
   * @param {Error}   result.error     error object in case the test fails, otherwise `undefined`
   * @param {*}       result.result    return object of test function
   * @param {number}  result.duration  duration of test
   * @param {boolean} result.passed    true if test has passed, otherwise false
   * @param {object}  result.retries   information about spec related retries, e.g. `{ attempts: 0, limit: 0 }`
   */
  afterTest: async function (test, context, { error, result, duration, passed, retries }) {
    if (!passed) {
      await browser.takeScreenshot();
    }
  },

  /**
   * Hook that gets executed after the suite has ended
   * @param {object} suite suite details
   */
  // afterSuite: function (suite) {
  // },
  /**
   * Runs after a WebdriverIO command gets executed
   * @param {string} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {number} result 0 - command success, 1 - command error
   * @param {object} error error object if any
   */
  // afterCommand: function (commandName, args, result, error) {
  // },
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // after: function (result, capabilities, specs) {
  // },
  /**
   * Gets executed right after terminating the webdriver session.
   * @param {object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  afterSession: async function (config, capabilities, specs) {
    await logger.writeToFile(`${process.cwd()}/test-logs.txt`);
  },
  /**
   * Gets executed after all workers got shut down and the process is about to exit. An error
   * thrown in the onComplete hook will result in the test run failing.
   * @param {object} exitCode 0 - success, 1 - fail
   * @param {object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {<Object>} results object containing test results
   */
  onComplete: async function (exitCode, config, capabilities, results) {},
  /**
   * Gets executed when a refresh happens.
   * @param {string} oldSessionId session ID of the old session
   * @param {string} newSessionId session ID of the new session
   */
  // onReload: function(oldSessionId, newSessionId) {
  // }
  /**
   * Hook that gets executed before a WebdriverIO assertion happens.
   * @param {object} params information about the assertion to be executed
   */
  // beforeAssertion: function(params) {
  // }
  /**
   * Hook that gets executed after a WebdriverIO assertion happened.
   * @param {object} params information about the assertion that was executed, including its results
   */
  // afterAssertion: function(params) {
  // }
};
