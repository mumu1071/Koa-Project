const http = require('http');
const request = require("request");
const fetch = require('node-fetch')
const cheerio = require('cheerio');
const mongoDB = require('../util/mongo-db')

class Test {

    saveDb(slideListData) {
        slideListData.forEach(function (item) {
            const count = mongoDB.findCount('aa', item)
            if (count > 0) {
                const aa = mongoDB.insertOne('aa', item)
                console.info("成功插入")
            }
        });
    }


    httpNet(url) {
        http.get(url, (res) => {
            let html = '';
            // 获取页面数据
            res.on('data', (data) => {
                html += data;
            });

            // 数据获取结束
            res.on('end', () => {
                // 通过过滤页面信息获取实际需求的轮播图信息
                const slideListData = this.parseHtml(html);
            });
        }).on('error', () => {
            console.log('获取数据出错！');
        });
    }

    requestNet(url) {
        let options = {
            url: 'http://gank.io/api/data/Android/10/1'
        };
        request.get(url, options, function (err, response, body) {
            console.info(response.body);
        });
    }

    fetchNet(url) {
        fetch(url, {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "zh-CN,zh;q=0.9",
                "cache-control": "max-age=0",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "none",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1"
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        })
            .then(json => {
                console.log(json)
            });
    }

    testParseHtml() {
        const html = '';
        const slideListData = this.parseHtml(html);
        console.info(JSON.stringify(slideListData));
    }

    parseHtml(html) {
        html = html.replaceAll("box movie_list", "movie_list")
        const $ = cheerio.load(html);
        // 根据id获取轮播图列表信息
        const slideList = $('.movie_list').children('ul')
        // 轮播图数据
        const slideListData = [];
        /* 轮播图列表信息遍历 */
        slideList.find('li').each(function (item) {
            const pic = $(this);
            // 找到a标签并获取href属性
            const pic_href = pic.find('a').attr('href');
            // 找到a标签的子标签img并获取_src
            const pic_src = pic.find('a').children('img').attr('src');
            // 找到a标签的子标签img并获取alt
            const title = pic.find('a').children('img').attr('title');
            // 向数组插入数据
            slideListData.push({
                pic_href: pic_href,
                pic_src: pic_src,
                title: title
            });
        });
        // 返回轮播图列表信息
        return slideListData;
    }

    demoTest() {
        let url = 'https://bb9055.com/video/video_list.html?video_type=1&page_index=';
        for (let i = 2; i < 3; i++) {
            url += i
            console.log("请求网络 " + url);
            this.fetchNet(url);
        }
    }
}

let test = new Test();
test.demoTest();



