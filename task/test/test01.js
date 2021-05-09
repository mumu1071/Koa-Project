const MongoDB = require('../util/mongo-db')

class MongoDBTest {
    async test() {
        let points = await MongoDB().findAll("regionPoint", {});
        let result = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [105.380859375, 31.57853542647338]
                    }
                }
            ]
        }
        console.info(result);
    }
}

let mongoDBTest = new MongoDBTest();
mongoDBTest.test().then(r => {

});



