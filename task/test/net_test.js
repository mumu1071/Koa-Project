const request = require("request");

class NetTest {
    //测试test请求
    testNetGet() {
        let options = {
            url: 'http://gank.io/api/data/Android/10/1'
            // url: 'https://api.some-server.com/',
            // agentOptions: {
            //     cert: fs.readFileSync(certFile),
            //     key: fs.readFileSync(keyFile),
            //     passphrase: 'password',
            //     securityOptions: 'SSL_OP_NO_SSLv3'
            // }
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

    testNetPut() {
        let options = {
            url: 'http://xxxxxxxx.s3.us-east-1.amazonaws.com',// ,
            headers: {
                host: 'jwlipirtest.s3.amazonaws.com',
                'x-amz-content-sha256': 'UNSIGNED-PAYLOAD',
                'x-amz-date': date,
                Authorization: result
            },
            body: bitmap
        };

        request.put(options, function (error, response, body) {
            console.info('response:' + JSON.stringify(response));
            console.info("statusCode:" + response.statusCode)
            console.info('body: ' + body);
        });
    }
}


let netTest = new NetTest();
netTest.testNetGet();








