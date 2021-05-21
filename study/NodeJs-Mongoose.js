const mongoose = require('mongoose')
const TestSchema = require('../models/test_model')

// const db = 'mongodb://localhost/test'
const db = 'mongodb://47.99.187.0/dhgate'
mongoose.connect(db, (err) => {
    if (err) {
        console.log("mongodb connect fail")
    } else {
        console.log("mongodb connect success");
    }
})

class MongoDBTest {
    //增加数据
    insert() {
        let testSchema = new TestSchema({
            name: 'Tracy McGrady',
            age: 37,
            loginDate: new Date(),
            firstName: 'yang'
        })
        testSchema.save(function (err, res) {
            if (err) {
                console.log("Error:" + err);
            } else {
                console.log("Res:" + res);
            }
        });
    }

    remove() {
        TestSchema.remove({}, function (err, res) {
            if (err) {
                console.log("Error:" + err);
            } else {
                console.log("Res:" + res);
            }
        })
    }

    async queryData() {
        let result;
        //  第一条数据
        // result = await TestSchema.findOne().exec();
        // 全部数据
        // result = await TestSchema.find().exec();
        // 指定字段的数据（除了 _id 你不能在一个对象中同时指定 0 和 1）
        // result = await TestSchema.find({}, {"_id": 0, 'name.age': 1}, {}).exec();
        // 指定条件查询
        // result = await TestSchema.find({"name": "yang", "name.age": 18}).exec();
        // 高级查询  $gt（大于）、$gte（大于或等于）、 $lt（小于）、 $lte（小于或等于）
        result = await TestSchema.find({'age': {"$lte": 37}}).exec();
        // and和or使用
        console.info(result);
    }


}

let mongoDBTest = new MongoDBTest();
// const aa = mongoDBTest.insert()
// const aa = mongoDBTest.remove()
const aa = mongoDBTest.queryData()