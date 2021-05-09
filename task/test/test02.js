const mongoose = require('mongoose')
const PointSchema = require('../../models/point')

const db = 'mongodb://localhost/test'
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

}

let mongoDBTest = new MongoDBTest();
mongoDBTest.findAll().then(r => {
})