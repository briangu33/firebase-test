"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InMemoryDataLayer {
    constructor() {
        this.dataStore = {};
    }
    save(editToken, data) {
        this.dataStore[editToken] = data;
    }
    get(editToken) {
        return this.dataStore[editToken] || {};
    }
}
exports.InMemoryDataLayer = InMemoryDataLayer;
