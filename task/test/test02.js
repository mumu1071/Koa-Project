const mongoose = require('mongoose')
const PointSchema = require('../../models/protest_map')
const async = require("async")

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
    async findAll() {
        let list = await PointSchema.find({}).limit(20).exec();
        let result = {
            "type": "FeatureCollection",
            "features": list
        }
        console.info(JSON.stringify(result));
        return result
    }

    latest() {
        async.parallel([
            function (callback) {
                PointSchema.find({}, null, {limit: 40}, function (err, res) {
                    callback(null, res)
                })
            },
            function (callback) {
                PointSchema.find({}, null, {limit: 60}, function (err, res) {
                    callback(null, res)
                })
            },
        ], function (err, res) {
            if (res && res.length > 1) {
                const result = []
                result.push(...res[0])
                result.push(...res[1])
                console.info(result);
            }

        })
    }

}

let mongoDBTest = new MongoDBTest();
let aa = mongoDBTest.latest()