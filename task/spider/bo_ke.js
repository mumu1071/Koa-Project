const request = require("request");

class NetTest {
    demo() {
        for (let i = 2; i < 3; i++) {
            const url = 'https://bb9051.com/video/video_list.html?video_type=1&page_index=' + i
            this.test_request(url);
        }
    }

    test_request(url) {
        console.info(url);
        let options = {
            url: url,
            timeout: 2000,
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "zh-CN,zh;q=0.9",
                "cache-control": "max-age=0",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
                "cookie": "Hm_lvt_c2dbf69ea76fc340d671580bda05c5bd=1650039974,1650120954; Hm_lvt_de50db9577c04b47e613fe0165985047=1650039974,1650120954; Hm_lpvt_de50db9577c04b47e613fe0165985047=1650120992; Hm_lpvt_c2dbf69ea76fc340d671580bda05c5bd=1650120992",
                "Referer": "https://bb9051.com/home.html",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET",

        };
        request.get(options, function (err, response, body) {
            
            console.info(JSON.stringify(body));
            console.info(JSON.stringify(err));
        });
    }

    aesDecrypt(data, aesKey = '46cc793c53dc451b') { //解密
        if (data.length < 1) {
            return '';
        }
        let key = CryptoJS.enc.Utf8.parse(aesKey);
        let decrypt = CryptoJS.AES.decrypt(data, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
        let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr;
    }

}

let netTest = new NetTest();
netTest.demo();








