"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContent = exports.getAvailableLanguages = void 0;
var _graphqlTag = _interopRequireDefault(require("graphql-tag"));
var _graphql = require("graphql");
var _templateObject, _templateObject2;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var getContent = function getContent(apiKey, language) {
  var query = (0, _graphqlTag.default)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    query content {\n      requestContent(environmentID: \"", "\", language: \"", "\") {\n        body {\n          key\n          value\n        }\n      }\n    }\n  "])), apiKey, language);
  return {
    query: (0, _graphql.print)(query),
    type: 'requestContent'
  };
};
exports.getContent = getContent;
var getAvailableLanguages = function getAvailableLanguages() {
  var query = (0, _graphqlTag.default)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    query{\n      getAvailableLanguages {\n        body{\n          label\n          code\n          localLabel\n        }\n      }\n    }\n  "])));
  return {
    query: (0, _graphql.print)(query),
    type: 'getAvailableLanguages'
  };
};
exports.getAvailableLanguages = getAvailableLanguages;