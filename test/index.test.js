const {assert} = require(`chai`);
const mockRequire = require(`mock-require`);
const sinon = require(`sinon`);
sinon.assert.expose(assert, { prefix: `` });

const DEFAULT_CONFIG = {dest: `dist`, src: `locales`, locales: `*`}

/**
 * callCli - Test utility to call index.js with a spy instead of pontoonToJson,
 *           as well as an object to replace what would normally be parsed from process.argv
 *
 * @param  {type} args object representing the output of minimist (which would normally parse process.argv)
 * @return {obj}       spy representing a call to pontoonToJson
 */
function callCli(args) {
  const spy = sinon.spy();
  mockRequire("../src/pontoon-to-json", spy);
  mockRequire("minimist", () => args || {});
  require(`../index`);
  return spy;
}

describe("pontoon-to-json", () => {
  describe("cli", () => {
    afterEach(() => {
      // Allows us to re-require index.js for each test
      delete require.cache[require.resolve(`../index`)];
    });
    it("should call pontoonToJson with defaults if no args are passed in", () => {
      const result = callCli();
      assert.calledWith(result, DEFAULT_CONFIG);
    });
    it("should recognize the --dest arg", () => {
      const result = callCli({dest: `foo`});
      assert.calledWith(result, Object.assign({}, DEFAULT_CONFIG, {dest: `foo`}));
    });
    it("should recognize the --src arg", () => {
      const result = callCli({src: `foo`});
      assert.calledWith(result, Object.assign({}, DEFAULT_CONFIG, {src: `foo`}));
    });
    it("should recognize the --locales arg", () => {
      const result = callCli({locales: `en, fr`});
      assert.calledWith(result, Object.assign({}, DEFAULT_CONFIG, {locales: `en, fr`}));
    });
  });
});
