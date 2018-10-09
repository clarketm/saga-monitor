const fs = require("fs");

describe("createSagaMonitor", () => {
  const root = fs.realpathSync(process.cwd());
  const config = {
    level: "debug",
    verbose: true,
    color: "#03A9F4",
    effectTrigger: false,
    effectResolve: false,
    effectReject: false,
    effectCancel: false,
    actionDispatch: false
  };
  let createSagaMonitor;

  beforeAll(() => {
    jest.mock(root);
    createSagaMonitor = require(root).default;
  });

  it("should pass values from `config`", () => {
    createSagaMonitor(config);
    expect(createSagaMonitor).toHaveBeenLastCalledWith(config);
  });

  it("should pass no values", () => {
    createSagaMonitor();
    expect(createSagaMonitor).toHaveBeenLastCalledWith();
  });
});
