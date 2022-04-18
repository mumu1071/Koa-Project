const request = require("request");
const async = require("async");


class RequestNetTest {
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

    //测试put请求
    testNetPut() {
        let options = {
            url: 'http://xxxxxxxx.s3.us-east-1.amazonaws.com',// ,
            headers: {
                host: 'jwlipirtest.s3.amazonaws.com',
                'x-amz-content-sha256': 'UNSIGNED-PAYLOAD',
                'x-amz-date': date,
                Authorization: result
            }, body: bitmap
        };

        request.put(options, function (error, response, body) {
            console.info('response:' + JSON.stringify(response));
            console.info("statusCode:" + response.statusCode)
            console.info('body: ' + body);
        });
    }
}

let requestNetTest = new RequestNetTest();
requestNetTest.testNetGet();

class FetchNetTest {
    async testNetGet() {
        let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
        let response = await fetch(url, {
            headers: {
                Authentication: 'secret'
            }
        });
        let commits = await response.json(); // 读取 response body，并将其解析为 JSON
        let text = await response.text(); // 将 response body 读取为文本
        alert(commits[0].author.login);
    }

    testNetGet() {
        fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
            .then(response => response.json())
            .then(commits => alert(commits[0].author.login));
    }

    async testNetPost() {
        let user = {
            name: 'John', surname: 'Smith'
        };
        let response = await fetch('/article/fetch/post/user', {
            method: 'POST', headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, body: JSON.stringify(user)
        });
        let result = await response.json();
        alert(result.message);
    }

    testNetParams() {
        let promise = fetch(url, {
            method: "GET", // POST，PUT，DELETE，等。
            headers: {
                // 内容类型 header 值通常是自动设置的
                // 取决于 request body
                "Content-Type": "text/plain;charset=UTF-8"
            }, body: undefined, // string，FormData，Blob，BufferSource，或 URLSearchParams
            referrer: "about:client", // 或 "" 以不发送 Referer header，
            // 或者是当前源的 url
            referrerPolicy: "no-referrer-when-downgrade", // no-referrer，origin，same-origin...
            mode: "cors", // same-origin，no-cors
            credentials: "same-origin", // omit，include
            cache: "default", // no-store，reload，no-cache，force-cache，或 only-if-cached
            redirect: "follow", // manual，error
            integrity: "", // 一个 hash，像 "sha256-abcdef1234567890"
            keepalive: false, // true
            signal: undefined, // AbortController 来中止请求
            window: window // null
        });
    }

}

class AxiosNetTest {
    initAxios() {
        const timeout = 10000;
        const secretKey = '4tRhjFDkC2RnZ74yXhd2Ta4mwJsHEGS4';
        const request = axios.create({timeout});
        request.interceptors.response.use(response => response.data, (error) => {
            console.log(error)
        });
        request.interceptors.request.use(request => {
            if (request.params) {
                Object.keys(request.params).forEach(key => {
                    if (typeof request.params[key] === 'object') {
                        request.params[key] = JSON.stringify(request.params[key]);
                    }
                });
            }

            const query = request.params || {};
            const body = request.data || {};
            const method = request.method.toUpperCase();
            const path = url.parse(request.url).path;

            const {signature, timestamp, stuffKeys} = sign({
                payload: {
                    body, query,
                }, secretKey, method, path, ignoreKeys: ['file'],
            });

            request.headers['mg-sig'] = signature;
            request.headers['mg-ts'] = timestamp.getTime();
            request.headers['mg-sk'] = stuffKeys;

            return request;
        });
        return request;
    }
}

let netTest = new AxiosNetTest();
const requestTemp = netTest.initAxios();
requestTemp('http://gank.io/api/data/Android/10/1', {
    method: 'get'
}).then(function (response) {
    console.log(response);
})
    .catch(function (error) {
        console.log(error);
    });







