/* eslint-disable no-console */
import * as is from "@redux-saga/is";
import { CANCELLED, IS_BROWSER, PENDING, REJECTED, RESOLVED } from "./modules/constants";
import { isRaceEffect } from "./modules/checkers";
import logSaga from "./modules/logSaga";
import Manager from "./modules/Manager";
import { version } from "../package.json";

const LOG_SAGAS_STYLE = "font-weight: bold";

const globalScope =
  typeof window.document === "undefined" && navigator.product === "ReactNative"
    ? global
    : IS_BROWSER
    ? window
    : null;

function time() {
  if (typeof performance !== "undefined" && performance.now) {
    return performance.now();
  } else {
    return Date.now();
  }
}

const manager = new Manager();

function computeEffectDur(effect) {
  const now = time();
  Object.assign(effect, {
    end: now,
    duration: now - effect.start
  });
}

function resolveEffect(effectId, result) {
  const effect = manager.get(effectId);

  if (is.task(result)) {
    result.toPromise().then(
      taskResult => {
        if (result.isCancelled()) {
          cancelEffect(effectId);
        } else {
          resolveEffect(effectId, taskResult);
        }
      },
      taskError => rejectEffect(effectId, taskError)
    );
  } else {
    computeEffectDur(effect);
    effect.status = RESOLVED;
    effect.result = result;
    if (isRaceEffect(effect.effect)) {
      setRaceWinner(effectId, result);
    }
  }
}

function rejectEffect(effectId, error) {
  const effect = manager.get(effectId);
  computeEffectDur(effect);
  effect.status = REJECTED;
  effect.error = error;
  if (isRaceEffect(effect.effect)) {
    setRaceWinner(effectId, error);
  }
}

function cancelEffect(effectId) {
  const effect = manager.get(effectId);
  computeEffectDur(effect);
  effect.status = CANCELLED;
}

function setRaceWinner(raceEffectId, result) {
  const winnerLabel = Object.keys(result)[0];
  for (const childId of manager.getChildIds(raceEffectId)) {
    const childEffect = manager.get(childId);
    if (childEffect.label === winnerLabel) {
      childEffect.winner = true;
    }
  }
}

const defaultConfig = {
  level: "debug",
  color: "#03A9F4",
  verbose: true,
  rootSagaStart: false,
  effectTrigger: false,
  effectResolve: false,
  effectReject: false,
  effectCancel: false,
  actionDispatch: false
};

function createSagaMonitor(options = {}) {
  const config = { ...defaultConfig, ...options };

  const {
    level,
    verbose,
    color,
    rootSagaStart,
    effectTrigger,
    effectResolve,
    effectReject,
    effectCancel,
    actionDispatch
  } = config;

  let styles = [`color: ${color}`, "font-weight: bold"].join(";");

  function rootSagaStarted(desc) {
    if (rootSagaStart) {
      console[level]("%c Root saga started:", styles, desc.saga.name || "anonymous", desc.args);
    }

    manager.setRootEffect(
      desc.effectId,
      Object.assign({}, desc, {
        status: PENDING,
        start: time()
      })
    );
  }

  function effectTriggered(desc) {
    if (effectTrigger) {
      console[level]("%c effectTriggered:", styles, desc);
    }

    manager.set(
      desc.effectId,
      Object.assign({}, desc, {
        status: PENDING,
        start: time()
      })
    );
  }

  function effectResolved(effectId, result) {
    if (effectResolve) {
      console[level]("%c effectResolved:", styles, effectId, result);
    }
    resolveEffect(effectId, result);
  }

  function effectRejected(effectId, error) {
    if (effectReject) {
      console[level]("%c effectRejected:", styles, effectId, error);
    }
    rejectEffect(effectId, error);
  }

  function effectCancelled(effectId) {
    if (effectCancel) {
      console[level]("%c effectCancelled:", styles, effectId);
    }
    cancelEffect(effectId);
  }

  function actionDispatched(action) {
    if (actionDispatch) {
      console[level]("%c actionDispatched:", styles, action);
    }
  }

  if (globalScope) {
    if (verbose) {
      console[level]("View Sagas by executing %c$$LogSagas()", LOG_SAGAS_STYLE, "in the console");
    }
    // Export the snapshot-logging function to run from the browser console or extensions.
    globalScope.$$LogSagas = () => logSaga(manager, color);
  }

  return {
    rootSagaStarted,
    effectTriggered,
    effectResolved,
    effectRejected,
    effectCancelled,
    actionDispatched
  };
}

// Version
createSagaMonitor.VERSION = version;
logSaga.VERSION = version;

// Export the snapshot-logging function for arbitrary use by external code.
export { logSaga };

// Export the `sagaMonitor` to pass to the middleware.
export default createSagaMonitor;
