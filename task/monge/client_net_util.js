const request = require("request");
const {transform, crypto} = require('xx-utils');
const {sign} = require('show-your-ticket');
const {key, expires} = require('../monge/setting').requestSignature.root;
const axios = require('axios');

class NetTest {
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
                    body,
                    query,
                },
                secretKey,
                method,
                path,
                ignoreKeys: ['file'],
            });

            request.headers['mg-sig'] = signature;
            request.headers['mg-ts'] = timestamp.getTime();
            request.headers['mg-sk'] = stuffKeys;

            return request;
        });
        return request;
    }
}


let netTest = new NetTest();
const requestTemp = netTest.initAxios();
requestTemp('http://gank.io/api/data/Android/10/1', {
    method: 'get'
}).then(function (response) {
    console.log(response);
})
    .catch(function (error) {
        console.log(error);
    });








