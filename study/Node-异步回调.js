'use strict'
const async = require("async");
/**
 * 控制异步回调
 * https://yijiebuyi.com/blog/be234394cd350de16479c583f6f6bcb6.html
 */
class TestAsync {
    //串行且无关联
    async series_no_impact() {
        await async.series([
            function (callback) {
                // do some stuff
                callback(null, 'one'); //如果有错误信息传err否则为空，传参数one
            },
            function (callback) {
                // do some more stuff ...
                callback(null, 'two');
            }], function (err, results) {
            console.log(results); //接收参数数组['one','two']，值是上面数组函数每个callback里面的参数
            console.log(err);     //捕获错误信息，如果没有则为空
        });
    }

    //并行且无关联
    async parallel_no_impact() {
        await async.parallel([
            function (callback) {
                // do some stuff
                callback(null, 'one'); //如果有错误信息传err否则为空，传参数one
            },
            function (callback) {
                // do some more stuff ...
                callback(null, 'two');
            }], function (err, results) {
            console.log(results); //接收参数数组['one','two']，值是上面数组函数每个callback里面的参数
            console.log(err);     //捕获错误信息，如果没有则为空
        });
    }

    //串行且有关联
    async waterfall_impact() {
        await async.waterfall([
            function (callback) {
                // do some stuff
                callback(null, 'one'); //如果有错误信息传err否则为空，传参数one
            },
            function (oneArg, callback) {
                // do some more stuff ...
                callback(null, oneArg + '| two');
            }], function (err, results) {
            console.log(results); //接收参数数组['one','two']，值是上面数组函数每个callback里面的参数
            console.log(err);     //捕获错误信息，如果没有则为空
        });
    }

    //智能控制 auto 需要Parallel又需要waterfull
    async auto_test() {
        await async.auto({
            //func1、func2是并行执行
            func1: function (callback) {
                console.log('in func1');
                callback(null, 'data', 'converted to array');
            },

            func2: function (callback) {
                console.log('in func2');
                callback(null, {"puncha": "during"});
            },
            func3: ["func2", function (results, callback) {
                //func2执行完后才执行func3
                console.log('in func3', JSON.stringify(results));
                callback(null, '3');
            }],
            func4: ["func1", "func3", function (results, callback) {
                //func1，func3执行完后才执行func4
                console.log('in func4', JSON.stringify(results));
                callback(null, {'file': results.func3, 'email': 'user@example.com'});
            }]
        }, function (err, results) {
            //最后返回func1、2、3、4结果
            console.log('err = ', err);
            console.log('results = ', results);
        });
    }
}

let testAsync = new TestAsync();
let aa = testAsync.waterfall_impact()


