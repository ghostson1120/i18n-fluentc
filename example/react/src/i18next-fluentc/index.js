"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("./utils.js");
var _query = require("./query.js");
var _request = _interopRequireDefault(require("./request.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var getDefaults = function getDefaults() {
  return {
    apiPath: 'https://api.fluentc.io/graphql',
    apiKey: 'da2-wtkl5bpofjbu5ex5iugu4o2mbm',
    referenceLng: 'en',
    reloadInterval: typeof window !== 'undefined' ? false : 60 * 60 * 1000,
    crossDomain: false,
    allowedAddOrUpdateHosts: ['localhost']
  };
};
var Backend = function () {
  function Backend(services) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var allOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var callback = arguments.length > 3 ? arguments[3] : undefined;
    _classCallCheck(this, Backend);
    this.services = services;
    this.options = options;
    this.allOptions = allOptions;
    this.type = 'backend';
    if (services && services.environmentId) {
      this.init(null, services, allOptions, options);
    } else {
      this.init(services, options, allOptions, callback);
    }
  }
  _createClass(Backend, [{
    key: "init",
    value: function init(services) {
      var _this = this;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var allOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var callback = arguments.length > 3 ? arguments[3] : undefined;
      if (!options.referenceLng && allOptions.fallbackLng && Array.isArray(allOptions.fallbackLng) && allOptions.fallbackLng[0] !== 'dev') {
        options.referenceLng = allOptions.fallbackLng[0];
      }
      this.services = services;
      var defOpt = getDefaults();
      var passedOpt = (0, _utils.defaults)(options, this.options || {});
      if (passedOpt.reloadInterval && passedOpt.reloadInterval < 5 * 60 * 1000) {
        console.warn('Your configured reloadInterval option is to low.');
        passedOpt.reloadInterval = defOpt.reloadInterval;
      }
      this.options = (0, _utils.defaults)(options, this.options || {}, defOpt);
      this.allOptions = allOptions;
      this.somethingLoaded = false;
      this.isProjectNotExisting = false;
      var hostname = typeof window !== 'undefined' && window.location && window.location.hostname;
      if (hostname) {
        this.isAddOrUpdateAllowed = typeof this.options.allowedAddOrUpdateHosts === 'function' ? this.options.allowedAddOrUpdateHosts(hostname) : this.options.allowedAddOrUpdateHosts.indexOf(hostname) > -1;
        if (services && services.logger && (allOptions.saveMissing || allOptions.updateMissing)) {
          if (!this.isAddOrUpdateAllowed) {
            services.logger.warn(typeof this.options.allowedAddOrUpdateHosts === 'function' ? "fluentc-backend: will not save or update missings because allowedAddOrUpdateHosts returned false for the host \"".concat(hostname, "\".") : "fluentc-backend: will not save or update missings because the host \"".concat(hostname, "\" was not in the list of allowedAddOrUpdateHosts: ").concat(this.options.allowedAddOrUpdateHosts.join(', '), " (matches need to be exact)."));
          } else if (hostname !== 'localhost') {
            services.logger.warn("fluentc-backend: you are using the save or update missings feature from this host \"".concat(hostname, "\".\nMake sure you will not use it in production!"));
          }
        }
      } else {
        this.isAddOrUpdateAllowed = true;
      }
      if (this.interval) clearInterval(this.interval);
      if (this.options.reloadInterval && this.options.environmentId) {
        this.interval = setInterval(function () {
          return _this.reload();
        }, this.options.reloadInterval);
      }
    }
  }, {
    key: "reload",
    value: function reload() {
      var _this2 = this;
      var _ref = this.services || {
          logger: console
        },
        backendConnector = _ref.backendConnector,
        languageUtils = _ref.languageUtils,
        logger = _ref.logger;
      if (!backendConnector) return;
      var currentLanguage = backendConnector.language;
      if (currentLanguage && currentLanguage.toLowerCase() === 'cimode') return;
      var toLoad = [];
      var append = function append(lng) {
        var lngs = languageUtils.toResolveHierarchy(lng);
        lngs.forEach(function (l) {
          if (toLoad.indexOf(l) < 0) toLoad.push(l);
        });
      };
      append(currentLanguage);
      if (this.allOptions.preload) this.allOptions.preload.forEach(function (l) {
        return append(l);
      });
      toLoad.forEach(function (lng) {
        _this2.allOptions.ns.forEach(function (ns) {
          backendConnector.read(lng, ns, 'read', null, null, function (err, data) {
            if (err) logger.warn("loading namespace ".concat(ns, " for language ").concat(lng, " failed"), err);
            if (!err && data) logger.log("loaded namespace ".concat(ns, " for language ").concat(lng), data);
            backendConnector.loaded("".concat(lng, "|").concat(ns), err, data);
          });
        });
      });
    }
  }, {
    key: "getLanguages",
    value: function getLanguages(callback) {
      var _this3 = this;
      var deferred;
      if (!callback) {
        deferred = (0, _utils.defer)();
        callback = function callback(err, ret) {
          if (err) return deferred.reject(err);
          deferred.resolve(ret);
        };
      }
      this.getLanguagesCalls = this.getLanguagesCalls || [];
      this.getLanguagesCalls.push(callback);
      if (this.getLanguagesCalls.length > 1) return;
      this.loadUrl({}, (0, _query.getAvailableLanguages)(), function (err, ret, info) {
        if (!_this3.somethingLoaded && info && info.resourceNotExisting) {
          var e = new Error("Fluentc environment ".concat(_this3.options.environmentId, " does not exist!"));
          var _clbs = _this3.getLanguagesCalls;
          _this3.getLanguagesCalls = [];
          return _clbs.forEach(function (clb) {
            return clb(e);
          });
        }
        console.log(ret);
        _this3.somethingLoaded = true;
        var clbs = _this3.getLanguagesCalls;
        _this3.getLanguagesCalls = [];
        clbs.forEach(function (clb) {
          return clb(err, ret);
        });
      });
      return deferred;
    }
  }, {
    key: "read",
    value: function read(language, namespace, callback) {
      var _this4 = this;
      var _ref2 = this.services || {
          logger: console
        },
        logger = _ref2.logger;
      var isMissing = (0, _utils.isMissingOption)(this.options, ['environmentId']);
      if (isMissing) return callback(new Error(isMissing), false);
      this.loadUrl({}, (0, _query.getContent)(this.options.environmentId, language), function (err, ret, info) {
        if (!_this4.somethingLoaded) {
          if (info && info.resourceNotExisting) {
            logger.error('Environment not existing');
          } else {
            _this4.somethingLoaded = true;
          }
        }
        var objectRet = {};
        if (ret && ret.length) {
          for (var i = 0; i < ret.length; i++) {
            objectRet[ret[i].key] = ret[i].value;
          }
        }
        callback(err, objectRet);
      });
    }
  }, {
    key: "loadUrl",
    value: function loadUrl(options, payload, callback) {
      var _this5 = this;
      options = (0, _utils.defaults)(options, this.options);
      if (typeof payload === 'function') {
        callback = payload;
        payload = undefined;
      }
      callback = callback || function () {};
      (0, _request.default)(options, this.options.apiPath, payload, function (err, res) {
        var resourceNotExisting = res && res.resourceNotExisting;
        if (res && (res.status === 408 || res.status === 400)) {
          return callback('failed loading ' + payload.type, false, {
            resourceNotExisting: resourceNotExisting
          });
        }
        if (res && (res.status >= 500 && res.status < 600 || !res.status)) {
          return callback('failed loading ' + payload.type, false, {
            resourceNotExisting: resourceNotExisting
          });
        }
        if (res && res.status >= 400 && res.status < 500) {
          return callback('failed loading ' + payload.type, false, {
            resourceNotExisting: resourceNotExisting
          });
        }
        if (!res && err && err.message && err.message.indexOf('Failed to fetch') > -1) {
          return callback('failed loading ' + payload.type, false, {
            resourceNotExisting: resourceNotExisting
          });
        }
        if (err) return callback(err, false);
        var ret, parseErr;
        try {
          ret = JSON.parse(res.data);
          ret = ret.data[payload.type].body;
        } catch (e) {
          parseErr = 'failed parsing ' + payload.type + ' to json';
        }
        if (parseErr) return callback(parseErr, false);
        if (_this5.options.failLoadingOnEmptyJSON && !Object.keys(ret).length) {
          return callback('loaded result empty for ' + payload.type, false, {
            resourceNotExisting: resourceNotExisting
          });
        }
        callback(null, ret, {
          resourceNotExisting: resourceNotExisting
        });
      });
    }
  }]);
  return Backend;
}();
Backend.type = 'backend';
var _default = Backend;
exports.default = _default;
module.exports = exports.default;