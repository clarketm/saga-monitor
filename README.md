# saga-monitor
Simple and configurable redux-saga monitor

### Configuration
```js
const defaultConfig = {
  level: 'debug',             // logging level
  verbose: true,              // verbose mode
  color: '#03A9F4',           // default color
  effectTrigger: false,       // show triggered effects 
  effectResolve: false,       // show resolved effects 
  effectReject: false,        // show rejected effects
  effectCancel: false,        // show cancelled effects
  actionDispatch: false       // show dispatched actions
};
```

### Usage
```js
import createSagaMonitor from '../sagaMonitor'


// configuration
const config = {
  level: 'warn',
  effectTrigger: true
}

const middleware = [
  // create saga middleware w/ sagaMonitor
  createSagaMiddleware({
    sagaMonitor: createSagaMonitor(config)
  })
];
```

![console output](https://github.com/clarketm/saga-monitor/blob/master/console-output.png)
