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
