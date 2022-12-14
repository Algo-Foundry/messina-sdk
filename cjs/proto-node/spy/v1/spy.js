"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpyRPCServiceClient = exports.SpyRPCServiceService = exports.SubscribeSignedVAAResponse = exports.SubscribeSignedVAARequest = exports.FilterEntry = exports.EmitterFilter = exports.protobufPackage = void 0;
/* eslint-disable */
var long_1 = __importDefault(require("long"));
var grpc_js_1 = require("@grpc/grpc-js");
var minimal_1 = __importDefault(require("protobufjs/minimal"));
var publicrpc_1 = require("../../publicrpc/v1/publicrpc");
exports.protobufPackage = "spy.v1";
var baseEmitterFilter = { chainId: 0, emitterAddress: "" };
exports.EmitterFilter = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.chainId !== 0) {
            writer.uint32(8).int32(message.chainId);
        }
        if (message.emitterAddress !== "") {
            writer.uint32(18).string(message.emitterAddress);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseEmitterFilter);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.chainId = reader.int32();
                    break;
                case 2:
                    message.emitterAddress = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseEmitterFilter);
        if (object.chainId !== undefined && object.chainId !== null) {
            message.chainId = publicrpc_1.chainIDFromJSON(object.chainId);
        }
        else {
            message.chainId = 0;
        }
        if (object.emitterAddress !== undefined && object.emitterAddress !== null) {
            message.emitterAddress = String(object.emitterAddress);
        }
        else {
            message.emitterAddress = "";
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.chainId !== undefined &&
            (obj.chainId = publicrpc_1.chainIDToJSON(message.chainId));
        message.emitterAddress !== undefined &&
            (obj.emitterAddress = message.emitterAddress);
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseEmitterFilter);
        if (object.chainId !== undefined && object.chainId !== null) {
            message.chainId = object.chainId;
        }
        else {
            message.chainId = 0;
        }
        if (object.emitterAddress !== undefined && object.emitterAddress !== null) {
            message.emitterAddress = object.emitterAddress;
        }
        else {
            message.emitterAddress = "";
        }
        return message;
    },
};
var baseFilterEntry = {};
exports.FilterEntry = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.emitterFilter !== undefined) {
            exports.EmitterFilter.encode(message.emitterFilter, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseFilterEntry);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.emitterFilter = exports.EmitterFilter.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseFilterEntry);
        if (object.emitterFilter !== undefined && object.emitterFilter !== null) {
            message.emitterFilter = exports.EmitterFilter.fromJSON(object.emitterFilter);
        }
        else {
            message.emitterFilter = undefined;
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.emitterFilter !== undefined &&
            (obj.emitterFilter = message.emitterFilter
                ? exports.EmitterFilter.toJSON(message.emitterFilter)
                : undefined);
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseFilterEntry);
        if (object.emitterFilter !== undefined && object.emitterFilter !== null) {
            message.emitterFilter = exports.EmitterFilter.fromPartial(object.emitterFilter);
        }
        else {
            message.emitterFilter = undefined;
        }
        return message;
    },
};
var baseSubscribeSignedVAARequest = {};
exports.SubscribeSignedVAARequest = {
    encode: function (message, writer) {
        var e_1, _a;
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        try {
            for (var _b = __values(message.filters), _c = _b.next(); !_c.done; _c = _b.next()) {
                var v = _c.value;
                exports.FilterEntry.encode(v, writer.uint32(10).fork()).ldelim();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseSubscribeSignedVAARequest);
        message.filters = [];
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.filters.push(exports.FilterEntry.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var e_2, _a;
        var message = __assign({}, baseSubscribeSignedVAARequest);
        message.filters = [];
        if (object.filters !== undefined && object.filters !== null) {
            try {
                for (var _b = __values(object.filters), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var e = _c.value;
                    message.filters.push(exports.FilterEntry.fromJSON(e));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        if (message.filters) {
            obj.filters = message.filters.map(function (e) {
                return e ? exports.FilterEntry.toJSON(e) : undefined;
            });
        }
        else {
            obj.filters = [];
        }
        return obj;
    },
    fromPartial: function (object) {
        var e_3, _a;
        var message = __assign({}, baseSubscribeSignedVAARequest);
        message.filters = [];
        if (object.filters !== undefined && object.filters !== null) {
            try {
                for (var _b = __values(object.filters), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var e = _c.value;
                    message.filters.push(exports.FilterEntry.fromPartial(e));
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        return message;
    },
};
var baseSubscribeSignedVAAResponse = {};
exports.SubscribeSignedVAAResponse = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.vaaBytes.length !== 0) {
            writer.uint32(10).bytes(message.vaaBytes);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseSubscribeSignedVAAResponse);
        message.vaaBytes = Buffer.alloc(0);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.vaaBytes = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseSubscribeSignedVAAResponse);
        message.vaaBytes = Buffer.alloc(0);
        if (object.vaaBytes !== undefined && object.vaaBytes !== null) {
            message.vaaBytes = Buffer.from(bytesFromBase64(object.vaaBytes));
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.vaaBytes !== undefined &&
            (obj.vaaBytes = base64FromBytes(message.vaaBytes !== undefined ? message.vaaBytes : Buffer.alloc(0)));
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseSubscribeSignedVAAResponse);
        if (object.vaaBytes !== undefined && object.vaaBytes !== null) {
            message.vaaBytes = object.vaaBytes;
        }
        else {
            message.vaaBytes = Buffer.alloc(0);
        }
        return message;
    },
};
/** SpyRPCService exposes a gossip introspection service, allowing sniffing of gossip messages. */
exports.SpyRPCServiceService = {
    /** SubscribeSignedVAA returns a stream of signed VAA messages received on the network. */
    subscribeSignedVAA: {
        path: "/spy.v1.SpyRPCService/SubscribeSignedVAA",
        requestStream: false,
        responseStream: true,
        requestSerialize: function (value) {
            return Buffer.from(exports.SubscribeSignedVAARequest.encode(value).finish());
        },
        requestDeserialize: function (value) {
            return exports.SubscribeSignedVAARequest.decode(value);
        },
        responseSerialize: function (value) {
            return Buffer.from(exports.SubscribeSignedVAAResponse.encode(value).finish());
        },
        responseDeserialize: function (value) {
            return exports.SubscribeSignedVAAResponse.decode(value);
        },
    },
};
exports.SpyRPCServiceClient = grpc_js_1.makeGenericClientConstructor(exports.SpyRPCServiceService, "spy.v1.SpyRPCService");
var globalThis = (function () {
    if (typeof globalThis !== "undefined")
        return globalThis;
    if (typeof self !== "undefined")
        return self;
    if (typeof window !== "undefined")
        return window;
    if (typeof global !== "undefined")
        return global;
    throw "Unable to locate global object";
})();
var atob = globalThis.atob ||
    (function (b64) { return globalThis.Buffer.from(b64, "base64").toString("binary"); });
function bytesFromBase64(b64) {
    var bin = atob(b64);
    var arr = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; ++i) {
        arr[i] = bin.charCodeAt(i);
    }
    return arr;
}
var btoa = globalThis.btoa ||
    (function (bin) { return globalThis.Buffer.from(bin, "binary").toString("base64"); });
function base64FromBytes(arr) {
    var e_4, _a;
    var bin = [];
    try {
        for (var arr_1 = __values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
            var byte = arr_1_1.value;
            bin.push(String.fromCharCode(byte));
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return btoa(bin.join(""));
}
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
