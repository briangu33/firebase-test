"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var InMemoryDataLayer = function () {
    function InMemoryDataLayer() {
        _classCallCheck(this, InMemoryDataLayer);

        this.dataStore = {};
    }

    _createClass(InMemoryDataLayer, [{
        key: "save",
        value: function save(editToken, data) {
            this.dataStore[editToken] = data;
        }
    }, {
        key: "get",
        value: function get(editToken) {
            return this.dataStore[editToken] || {};
        }
    }]);

    return InMemoryDataLayer;
}();

exports.InMemoryDataLayer = InMemoryDataLayer;