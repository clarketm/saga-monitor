# Saga Monitor

[![NPM release](https://img.shields.io/npm/v/@clarketm/saga-monitor.svg)](https://www.npmjs.com/package/@clarketm/super)
[![Build Status](https://circleci.com/gh/clarketm/saga-monitor.svg?style=shield)](https://circleci.com/gh/clarketm/super)
[![Downloads](https://img.shields.io/npm/dt/@clarketm/saga-monitor.svg)](https://www.npmjs.com/package/@clarketm/super)
[![License](https://img.shields.io/npm/l/@clarketm/saga-monitor.svg)](LICENSE.md)

Simple, elegant, and configurable redux-saga monitor.

## Installation

### yarn

```bash
$ yarn add @clarketm/saga-monitor
```

### npm

```bash
$ npm install @clarketm/saga-monitor --save
```

## Configuration

```js
const defaultConfig = {
  level: "debug", // logging level
  verbose: true, // verbose mode
  color: "#03A9F4", // default color
  effectTrigger: false, // show triggered effects
  effectResolve: false, // show resolved effects
  effectReject: false, // show rejected effects
  effectCancel: false, // show cancelled effects
  actionDispatch: false // show dispatched actions
};
```

## Usage

```js
import createSagaMonitor from "@clarketm/saga-monitor";

// configuration
const config = {
  level: "log",
  effectTrigger: true,
  effectResolve: true,
  actionDispatch: true
};

const middleware = [
  // create saga middleware w/ sagaMonitor
  createSagaMiddleware({
    sagaMonitor: createSagaMonitor(config)
  })
];
```

![console output](https://github.com/clarketm/saga-monitor/blob/master/resources/console-output1.png)

> Run `$$LogSagas()` in the developer console to display a snapshot of all the available sagas.

![console output](https://github.com/clarketm/saga-monitor/blob/master/resources/console-output2.png)

## Credits

This was adapted from the [sagaMonitor](https://github.com/redux-saga/redux-saga/blob/master/examples/sagaMonitor/index.js) example in the [redux-saga](https://github.com/redux-saga/redux-saga) repository.

## License

MIT &copy; [**Travis Clarke**](https://blog.travismclarke.com/)
