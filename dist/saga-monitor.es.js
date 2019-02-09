/**
 * Copyright (c) 2018, Travis Clarke
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { effectTypes } from 'redux-saga/effects';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var createSymbol = function createSymbol(name) {
  return "@@redux-saga/" + name;
};
var IO =
/*#__PURE__*/
createSymbol('IO');
var TASK =
/*#__PURE__*/
createSymbol('TASK');

var func = function func(f) {
  return typeof f === 'function';
};
var array = Array.isArray;
var promise = function promise(p) {
  return p && func(p.then);
};
var iterator = function iterator(it) {
  return it && func(it.next) && func(it.throw);
};
var task = function task(t) {
  return t && t[TASK];
};
var effect = function effect(eff) {
  return eff && eff[IO];
};

var PENDING = "PENDING";
var RESOLVED = "RESOLVED";
var REJECTED = "REJECTED";
var CANCELLED = "CANCELLED";
var IS_BROWSER = typeof window !== "undefined" && window.document;

var isRaceEffect = function isRaceEffect(eff) {
  return effect(eff) && eff.type === effectTypes.RACE;
};

/* eslint-disable no-console */
// Poor man's `console.group` and `console.groupEnd` for Node.
// Can be overridden by the `console-group` polyfill.
// The poor man's groups look nice, too, so whether to use
// the polyfilled methods or the hand-made ones can be made a preference.
var groupPrefix = "";
var GROUP_SHIFT = "   ";
var GROUP_ARROW = "▼";
function consoleGroup() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (console.group) {
    var _console;

    (_console = console).group.apply(_console, args);
  } else {
    var _console2;

    console.log("");

    (_console2 = console).log.apply(_console2, [groupPrefix + GROUP_ARROW].concat(args));

    groupPrefix += GROUP_SHIFT;
  }
}
function consoleGroupEnd() {
  if (console.groupEnd) {
    console.groupEnd();
  } else {
    groupPrefix = groupPrefix.substr(0, groupPrefix.length - GROUP_SHIFT.length);
  }
}

function argToString(arg) {
  return typeof arg === "function" ? "".concat(arg.name) : typeof arg === "string" ? "'".concat(arg, "'") : arg;
}

function isPrimitive(val) {
  return typeof val === "string" || typeof val === "number" || typeof val === "boolean" || _typeof(val) === "symbol" || val === null || val === undefined;
}

var Formatter =
/*#__PURE__*/
function () {
  function Formatter() {
    _classCallCheck(this, Formatter);

    this.logs = [];
    this.suffix = [];
  }

  _createClass(Formatter, [{
    key: "add",
    value: function add(msg) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      // Remove the `%c` CSS styling that is not supported by the Node console.
      if (!IS_BROWSER && typeof msg === "string") {
        var prevMsg = msg;
        msg = msg.replace(/^%c\s*/, "");

        if (msg !== prevMsg) {
          // Remove the first argument which is the CSS style string.
          args.shift();
        }
      }

      this.logs.push({
        msg: msg,
        args: args
      });
      return this;
    }
  }, {
    key: "appendData",
    value: function appendData() {
      var _this$suffix;

      (_this$suffix = this.suffix).push.apply(_this$suffix, arguments);

      return this;
    }
  }, {
    key: "addValue",
    value: function addValue(value) {
      if (isPrimitive(value)) {
        this.add(value);
      } else {
        // The browser console supports `%O`, the Node console does not.
        if (IS_BROWSER) {
          this.add("%O", value);
        } else {
          this.add("%s", require("util").inspect(value));
        }
      }

      return this;
    }
  }, {
    key: "addCall",
    value: function addCall(name, args) {
      var _this = this;

      if (!args.length) {
        this.add("".concat(name, "()"));
      } else {
        this.add(name);
        this.add("(");
        args.forEach(function (arg, i) {
          _this.addValue(argToString(arg));

          _this.addValue(i === args.length - 1 ? ")" : ", ");
        });
      }

      return this;
    }
  }, {
    key: "getLog",
    value: function getLog() {
      var msgs = [];
      var msgsArgs = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.logs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _step.value,
              msg = _step$value.msg,
              args = _step$value.args;
          msgs.push(msg);
          msgsArgs.push.apply(msgsArgs, _toConsumableArray(args));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return [msgs.join("")].concat(msgsArgs, _toConsumableArray(this.suffix));
    }
  }]);

  return Formatter;
}();

var DEFAULT_STYLE = "color: black";
var LABEL_STYLE = "font-weight: bold";
var EFFECT_TYPE_STYLE = "color: blue";
var ERROR_STYLE = "color: red";
var CANCEL_STYLE = "color: #ccc";

var DescriptorFormatter =
/*#__PURE__*/
function (_Formatter) {
  _inherits(DescriptorFormatter, _Formatter);

  function DescriptorFormatter(isCancel, isError) {
    var _this;

    _classCallCheck(this, DescriptorFormatter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DescriptorFormatter).call(this));
    _this.logMethod = isError ? "error" : "log";

    _this.styleOverride = function (s) {
      return isCancel ? CANCEL_STYLE : isError ? ERROR_STYLE : s;
    };

    return _this;
  }

  _createClass(DescriptorFormatter, [{
    key: "resetStyle",
    value: function resetStyle() {
      return this.add("%c", this.styleOverride(DEFAULT_STYLE));
    }
  }, {
    key: "addLabel",
    value: function addLabel(text) {
      if (text) {
        return this.add("%c ".concat(text, " "), this.styleOverride(LABEL_STYLE));
      } else {
        return this;
      }
    }
  }, {
    key: "addEffectType",
    value: function addEffectType(text) {
      return this.add("%c ".concat(text, " "), this.styleOverride(EFFECT_TYPE_STYLE));
    }
  }, {
    key: "addDescResult",
    value: function addDescResult(descriptor, ignoreResult) {
      var status = descriptor.status,
          result = descriptor.result,
          error = descriptor.error,
          duration = descriptor.duration;

      if (status === RESOLVED && !ignoreResult) {
        if (array(result)) {
          this.addValue(" 🡲 ");
          this.addValue(result);
        } else {
          this.appendData("🡲", result);
        }
      } else if (status === REJECTED) {
        this.appendData("🡲 ⚠", error);
      } else if (status === PENDING) {
        this.appendData("⌛");
      } else if (status === CANCELLED) {
        this.appendData("🡲 Cancelled!");
      }

      if (status !== PENDING) {
        this.appendData("(".concat(duration.toFixed(2), "ms)"));
      }

      return this;
    }
  }]);

  return DescriptorFormatter;
}(Formatter);

function logSaga(manager) {
  if (manager.getRootIds().length === 0) {
    console.log("Saga monitor: No effects to log");
  }

  console.log("");
  console.log("Saga monitor:", Date.now(), new Date().toISOString());
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = manager.getRootIds()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var id = _step.value;
      logEffectTree(manager, id);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  console.log("");
}

function logEffectTree(manager, effectId) {
  var desc = manager.get(effectId);
  var childIds = manager.getChildIds(effectId);
  var formatter = getFormatterFromDescriptor(desc);

  if (childIds.length === 0) {
    var _console;

    (_console = console)[formatter.logMethod].apply(_console, _toConsumableArray(formatter.getLog()));
  } else {
    consoleGroup.apply(void 0, _toConsumableArray(formatter.getLog()));
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = childIds[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var id = _step2.value;
        logEffectTree(manager, id);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    consoleGroupEnd();
  }
}

function getFormatterFromDescriptor(desc) {
  var isCancel = desc.status === CANCELLED;
  var isError = desc.status === REJECTED;
  var formatter = new DescriptorFormatter(isCancel, isError);
  var winnerInd = desc.winner ? isError ? "✘" : "✓" : "";
  formatter.addLabel(winnerInd).addLabel(desc.label);

  if (desc.root) {
    formatter.addEffectType("root").resetStyle().addCall(desc.saga.name, desc.args).addDescResult(desc);
  } else if (iterator(desc.effect)) {
    formatter.addValue(desc.effect.name).addDescResult(desc, true);
  } else if (promise(desc.effect)) {
    formatter.addEffectType("promise").resetStyle().addDescResult(desc);
  } else if (effect(desc.effect)) {
    var _desc$effect = desc.effect,
        type = _desc$effect.type,
        payload = _desc$effect.payload;

    if (type === effectTypes.TAKE) {
      formatter.addEffectType("take").resetStyle().addValue(payload.channel == null ? payload.pattern : payload).addDescResult(desc);
    } else if (type === effectTypes.PUT) {
      formatter.addEffectType("put").resetStyle().addDescResult(Object.assign({}, desc, {
        result: payload
      }));
    } else if (type === effectTypes.ALL) {
      formatter.addEffectType("all").resetStyle().addDescResult(desc, true);
    } else if (type === effectTypes.RACE) {
      formatter.addEffectType("race").resetStyle().addDescResult(desc, true);
    } else if (type === effectTypes.CALL) {
      formatter.addEffectType("call").resetStyle().addCall(payload.fn.name, payload.args).addDescResult(desc);
    } else if (type === effectTypes.CPS) {
      formatter.addEffectType("cps").resetStyle().addCall(payload.fn.name, payload.args).addDescResult(desc);
    } else if (type === effectTypes.FORK) {
      formatter.addEffectType(payload.detached ? "spawn" : "fork").resetStyle().addCall(payload.fn.name, payload.args).addDescResult(desc);
    } else if (type === effectTypes.JOIN) {
      formatter.addEffectType("join").resetStyle().addDescResult(desc);
    } else if (type === effectTypes.CANCEL) {
      formatter.addEffectType("cancel").resetStyle().appendData(payload.name);
    } else if (type === effectTypes.SELECT) {
      formatter.addEffectType("select").resetStyle().addCall(payload.selector.name, payload.args).addDescResult(desc);
    } else if (type === effectTypes.ACTION_CHANNEL) {
      formatter.addEffectType("actionChannel").resetStyle().addValue(payload.buffer == null ? payload.pattern : payload).addDescResult(desc);
    } else if (type === effectTypes.CANCELLED) {
      formatter.addEffectType("cancelled").resetStyle().addDescResult(desc);
    } else if (type === effectTypes.FLUSH) {
      formatter.addEffectType("flush").resetStyle().addValue(payload).addDescResult(desc);
    } else if (type === effectTypes.GET_CONTEXT) {
      formatter.addEffectType("getContext").resetStyle().addValue(payload).addDescResult(desc);
    } else if (type === effectTypes.SET_CONTEXT) {
      formatter.addEffectType("setContext").resetStyle().addValue(payload).addDescResult(desc, true);
    } else {
      throw new Error("Invalid effect type ".concat(type));
    }
  } else {
    formatter.addEffectType("unknown").resetStyle().addDescResult(desc);
  }

  return formatter;
}

var Manager =
/*#__PURE__*/
function () {
  function Manager() {
    _classCallCheck(this, Manager);

    this.rootIds = []; // effect-id-to-effect-descriptor

    this.map = {}; // effect-id-to-array-of-child-id

    this.childIdsMap = {};
  }

  _createClass(Manager, [{
    key: "get",
    value: function get(effectId) {
      return this.map[effectId];
    }
  }, {
    key: "set",
    value: function set(effectId, desc) {
      this.map[effectId] = desc;

      if (this.childIdsMap[desc.parentEffectId] == null) {
        this.childIdsMap[desc.parentEffectId] = [];
      }

      this.childIdsMap[desc.parentEffectId].push(effectId);
    }
  }, {
    key: "setRootEffect",
    value: function setRootEffect(effectId, desc) {
      this.rootIds.push(effectId);
      this.set(effectId, Object.assign({
        root: true
      }, desc));
    }
  }, {
    key: "getRootIds",
    value: function getRootIds() {
      return this.rootIds;
    }
  }, {
    key: "getChildIds",
    value: function getChildIds(parentEffectId) {
      return this.childIdsMap[parentEffectId] || [];
    }
  }]);

  return Manager;
}();

var globalScope = typeof window.document === "undefined" && navigator.product === "ReactNative" ? global : IS_BROWSER ? window : null;

function time() {
  if (typeof performance !== "undefined" && performance.now) {
    return performance.now();
  } else {
    return Date.now();
  }
}

var manager = new Manager();

function computeEffectDur(effect$$1) {
  var now = time();
  Object.assign(effect$$1, {
    end: now,
    duration: now - effect$$1.start
  });
}

function resolveEffect(effectId, result) {
  var effect$$1 = manager.get(effectId);

  if (task(result)) {
    result.toPromise().then(function (taskResult) {
      if (result.isCancelled()) {
        cancelEffect(effectId);
      } else {
        resolveEffect(effectId, taskResult);
      }
    }, function (taskError) {
      return rejectEffect(effectId, taskError);
    });
  } else {
    computeEffectDur(effect$$1);
    effect$$1.status = RESOLVED;
    effect$$1.result = result;

    if (isRaceEffect(effect$$1.effect)) {
      setRaceWinner(effectId, result);
    }
  }
}

function rejectEffect(effectId, error) {
  var effect$$1 = manager.get(effectId);
  computeEffectDur(effect$$1);
  effect$$1.status = REJECTED;
  effect$$1.error = error;

  if (isRaceEffect(effect$$1.effect)) {
    setRaceWinner(effectId, error);
  }
}

function cancelEffect(effectId) {
  var effect$$1 = manager.get(effectId);
  computeEffectDur(effect$$1);
  effect$$1.status = CANCELLED;
}

function setRaceWinner(raceEffectId, result) {
  var winnerLabel = Object.keys(result)[0];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = manager.getChildIds(raceEffectId)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var childId = _step.value;
      var childEffect = manager.get(childId);

      if (childEffect.label === winnerLabel) {
        childEffect.winner = true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

var defaultConfig = {
  level: "debug",
  color: "#03A9F4",
  rootSagaStart: false,
  effectTrigger: false,
  effectResolve: false,
  effectReject: false,
  effectCancel: false,
  actionDispatch: false
};

function createSagaMonitor() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var config = _objectSpread({}, defaultConfig, options);

  var level = config.level,
      verbose = config.verbose,
      color = config.color,
      rootSagaStart = config.rootSagaStart,
      effectTrigger = config.effectTrigger,
      effectResolve = config.effectResolve,
      effectReject = config.effectReject,
      effectCancel = config.effectCancel,
      actionDispatch = config.actionDispatch;
  var styles = ["color: ".concat(color), "font-weight: bold"].join(";");

  function effectTriggered(desc) {
    if (effectTrigger) {
      console[level]("%c Saga monitor: effectTriggered:", styles, desc);
      manager.set(desc.effectId, Object.assign({}, desc, {
        status: PENDING,
        start: time()
      }));
    }
  }

  function effectResolved(effectId, result) {
    if (effectResolve) {
      console[level]("%c effectResolved:", styles, effectId, result);
      resolveEffect(effectId, result);
    }
  }

  function effectRejected(effectId, error) {
    if (effectReject) {
      console[level]("%c effectRejected:", styles, effectId, error);
      rejectEffect(effectId, error);
    }
  }

  function effectCancelled(effectId) {
    if (effectCancel) {
      console[level]("%c effectCancelled:", styles, effectId);
      cancelEffect(effectId);
    }
  }

  function actionDispatched(action) {
    if (actionDispatch) console[level]("%c actionDispatched:", styles, action);
  }

  if (verbose) {
    console[level]("View Sagas by executing %c $$LogSagas()", styles, "in the console");
  }

  return {
    effectTriggered: effectTriggered,
    effectResolved: effectResolved,
    effectRejected: effectRejected,
    effectCancelled: effectCancelled,
    actionDispatched: actionDispatched
  };
} // Export the snapshot-logging function to run from the browser console or extensions.


if (globalScope) {
  globalScope.$$LogSagas = function () {
    return logSaga(manager);
  };
} // Export the snapshot-logging function for arbitrary use by external code.

export default createSagaMonitor;
export { logSaga };
