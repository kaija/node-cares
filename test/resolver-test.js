// Copyright 2016 Lohith Royal Pinto <royalpinto@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE


var cares = require('../lib/cares.js');
var net = require('net');

var SERVERS = ['127.0.0.1'];
var PORT = 49160;
var dnsentries = require('./setup/dnsentries.js');


module.exports = {

    setUp: function (callback) {
        this.resolver = new cares.Resolver({
            servers: SERVERS,
            udp_port: PORT,
        });
        callback();
    },
    tearDown: function (callback) {
        callback();
    },

    resolve: function (test) {
        this.resolver.resolve('www.something.com', function (err, response) {
            test.ifError(err);
            test.notStrictEqual(response, null, err);
            test.ok(response instanceof Array, "Invalid response returned.");
            test.ok(response.length > 0, "Invalid response returned.");
            response.forEach(function (ip) {
                test.ok(net.isIP(ip), "Invalid IP address.");
                test.ok(net.isIPv4(ip), "Invalid IP address.");
            });

            var expected = (
                dnsentries[cares.NS_C_IN]
                [cares.NS_T_A]
                ['www.something.com']
                ['answer']
            )
            .filter( function (answer) {
                return answer['type'] === cares.NS_T_A;
            })
            .map( function (answer) {
                return answer['address'];
            });

            test.strictEqual(
                expected.length,
                response.length,
                "Number of records expected and recived are not same."
            );

            response.forEach(function (answer, index) {
                test.strictEqual(
                    answer,
                    expected[index],
                    "Expected and recieved record is not same."
                );
            });

            test.done();
        });
    },

    resolve_explicit_A: function (test) {
        this.resolver.resolve('www.something.com', 'A', function (err, response) {
            test.ifError(err);
            test.notStrictEqual(response, null, err);
            test.ok(response instanceof Array, "Invalid response returned.");
            test.ok(response.length > 0, "Invalid response returned.");
            response.forEach(function (ip) {
                test.ok(net.isIP(ip), "Invalid IP address.");
                test.ok(net.isIPv4(ip), "Invalid IP address.");
            });

            var expected = (
                dnsentries[cares.NS_C_IN]
                [cares.NS_T_A]
                ['www.something.com']
                ['answer']
            )
            .filter( function (answer) {
                return answer['type'] === cares.NS_T_A;
            })
            .map( function (answer) {
                return answer['address'];
            });

            test.strictEqual(
                expected.length,
                response.length,
                "Number of records expected and recived are not same."
            );

            response.forEach(function (answer, index) {
                test.strictEqual(
                    answer,
                    expected[index],
                    "Expected and recieved record is not same."
                );
            });

            test.done();
        });
    },

    resolve_explicit_AAAA: function (test) {
        this.resolver.resolve('www.something.com', 'AAAA', function (err, response) {
            test.ifError(err);
            test.notStrictEqual(response, null, err);
            test.ok(response instanceof Array, "Invalid response returned.");
            test.ok(response.length > 0, "Invalid response returned.");
            response.forEach(function (ip) {
                test.ok(net.isIP(ip), "Invalid IP address.");
                test.ok(net.isIPv6(ip), "Invalid IP address.");
            });

            var expected = (
                dnsentries[cares.NS_C_IN]
                [cares.NS_T_AAAA]
                ['www.something.com']
                ['answer']
            )
            .filter( function (answer) {
                return answer['type'] === cares.NS_T_AAAA;
            })
            .map( function (answer) {
                return answer['address'];
            });

            test.strictEqual(
                expected.length,
                response.length,
                "Number of records expected and recived are not same."
            );

            response.forEach(function (answer, index) {
                test.strictEqual(
                    answer,
                    expected[index],
                    "Expected and recieved record is not same."
                );
            });

            test.done();
        });
    },

    resolve4: function (test) {
        this.resolver.resolve4('www.something.com', function (err, response) {
            test.ifError(err);
            test.notStrictEqual(response, null, err);
            test.ok(response instanceof Array, "Invalid response returned.");
            test.ok(response.length > 0, "Invalid response returned.");
            response.forEach(function (ip) {
                test.ok(net.isIP(ip), "Invalid IP address.");
                test.ok(net.isIPv4(ip), "Invalid IP address.");
            });

            var expected = (
                dnsentries[cares.NS_C_IN]
                [cares.NS_T_A]
                ['www.something.com']
                ['answer']
            )
            .filter( function (answer) {
                return answer['type'] === cares.NS_T_A;
            })
            .map( function (answer) {
                return answer['address'];
            });

            test.strictEqual(
                expected.length,
                response.length,
                "Number of records expected and recived are not same."
            );

            response.forEach(function (answer, index) {
                test.strictEqual(
                    answer,
                    expected[index],
                    "Expected and recieved record is not same."
                );
            });

            test.done();
        });
    },

    resolve6: function (test) {
        this.resolver.resolve6('www.something.com', function (err, response) {
            test.ifError(err);
            test.notStrictEqual(response, null, err);
            test.ok(response instanceof Array, "Invalid response returned.");
            test.ok(response.length > 0, "Invalid response returned.");
            response.forEach(function (ip) {
                test.ok(net.isIP(ip), "Invalid IP address.");
                test.ok(net.isIPv6(ip), "Invalid IP address.");
            });

            var expected = (
                dnsentries[cares.NS_C_IN]
                [cares.NS_T_AAAA]
                ['www.something.com']
                ['answer']
            )
            .filter( function (answer) {
                return answer['type'] === cares.NS_T_AAAA;
            })
            .map( function (answer) {
                return answer['address'];
            });

            test.strictEqual(
                expected.length,
                response.length,
                "Number of records expected and recived are not same."
            );

            response.forEach(function (answer, index) {
                test.strictEqual(
                    answer,
                    expected[index],
                    "Expected and recieved record is not same."
                );
            });

            test.done();
        });
    },

    resolveCname: function (test) {
        this.resolver.resolveCname('www.something.com', function (err, response) {
            test.ifError(err);
            test.notStrictEqual(response, null, err);
            test.ok(response instanceof Array, "Invalid response returned.");
            test.ok(response.length > 0, "Invalid response returned.");
            response.forEach(function (data) {
                test.notStrictEqual(data, null, "Invalid CNAME");
            });

            var expected = (
                dnsentries[cares.NS_C_IN]
                [cares.NS_T_CNAME]
                ['www.something.com']
                ['answer']
            )
            .filter( function (answer) {
                return answer['type'] === cares.NS_T_CNAME;
            })
            .map( function (answer) {
                return answer['data'];
            });

            test.strictEqual(
                expected.length,
                response.length,
                "Number of records expected and recived are not same."
            );

            response.forEach(function (answer, index) {
                test.strictEqual(
                    answer,
                    expected[index],
                    "Expected and recieved record is not same."
                );
            });

            test.done();
        });
    },

};