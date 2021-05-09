const MongoDB = require('../../controller/util/mongo-db')

class MongoDBTest {
    async test() {
        let result = await MongoDB().findAll("map", {});
        console.info(result);
    }
}

let mongoDBTest = new MongoDBTest();
mongoDBTest.test();



