import {applyMiddleware, compose, createStore} from "redux";
import reducer from "./reducer";
import createSagaMiddleware from "redux-saga";
import createSagaMonitor from "../sagaMonitor";


export default function configureStore(initialState = {}) {

  // configuration
  const config = {
    level: 'warn',
    effectTrigger: true
  };

  const middleware = [
    // create saga middleware w/ sagaMonitor
    createSagaMiddleware({
      sagaMonitor: createSagaMonitor(config)
    })
  ];

  const enhancers = [
    applyMiddleware(...middleware)
  ];

  return createStore(
    reducer,
    initialState,
    compose(...enhancers)
  );
};
