# Saga Monitor

Simple, elegant, and configurable redux-saga monitor.

## Installation

### yarn

```bash
$ yarn add sagamonitor
```

### ppm

```bash
$ npm install sagamonitor --save
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
import createSagaMonitor from "sagamonitor";

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

![console output](https://github.com/clarketm/saga-monitor/blob/master/console-output1.png)

> Run `$$LogSagas()` in the developer console to display a snapshot of all the available sagas.

![console output](https://github.com/clarketm/saga-monitor/blob/master/console-output2.png)

## Credits

This was adapted from the [sagaMonitor](https://github.com/redux-saga/redux-saga/blob/master/examples/sagaMonitor/index.js) example in the [redux-saga](https://github.com/redux-saga/redux-saga) repository.

## License

MIT &copy; [**Travis Clarke**](https://blog.travismclarke.com/)
