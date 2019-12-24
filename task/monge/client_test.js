const request = require("request");
const {transform, crypto} = require('xx-utils');
const { sign } = require('show-your-ticket');
const {key, expires} = require('../monge/setting').requestSignature.root;


class NetTest {
    initMgSig(method, path, body, params,query) {
        const now = new Date();
        const signObject = {
            payload: {
                body: Object.assign({}, body || {}, params || {}),
                query: this.request.query,
            },
            secretKey: key,
            method: method,
            path: path,
        };
        const signString = transform.parseParams(signObject);
        return crypto.md5(signString);
    }


    //测试test请求
    testNetGet() {
        let options = {
            url: 'https://releaseapi.mangoebike.com/client/v3/ebike/stock/1804211317411',// ,
            headers: {
                host: 'jwlipirtest.s3.amazonaws.com',
                'x-amz-content-sha256': 'UNSIGNED-PAYLOAD',
                'x-amz-date': date,
                Authorization: result
            },
            body: bitmap
        };

        request.get(options, function (err, response, body) {
            console.info(response.body);
        });
    };

    //测试post请求
    testNetPost() {
        let options = {
            url: 'http://gank.io/api/data/Android/10/1',//req.query
            headers: {
                device: "asdfasdfaadfasdf"
            },//req.headers
            form: {
                deviceid: "xxxxxxx",
                handle: "12331242134",
                name: "Cindy_Crawford_0002.jpg",
                filepath: "http://xxxxxxxx.us-east-1.amazonaws.com/jwli/001.jpg"
            }  //req.body
        };

        request.post(options, function (error, response, body) {
            console.info('response:' + JSON.stringify(response));
            console.info("statusCode:" + response.statusCode)
            console.info('body: ' + body);
        });
    }
}


let netTest = new NetTest();
netTest.testNetGet();








