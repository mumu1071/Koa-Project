/**
 cnpm install mongodb
 */
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://test:123456@127.0.0.1:27017/test'; // 数据库为 test
var selectData = function (db, callback) {
    //连接到表
    var collection = db.collection('site');
    //查询数据
    var whereStr = {"name": '网站1'};
    collection.find(whereStr).toArray(function (err, result) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        callback(result);
    });
}
