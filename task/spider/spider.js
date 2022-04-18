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

    parseHtml(html) {
        if (!html) {
            console.log('无数据传入！');
            return;
        }
        const $ = cheerio.load(html);
        // 根据id获取轮播图列表信息
        const slideList = $('#foucsSlideList');
        // 轮播图数据
        const slideListData = [];
        /* 轮播图列表信息遍历 */
        slideList.find('li').each(function (item) {
            const pic = $(this);
            // 找到a标签并获取href属性
            const pic_href = pic.find('a').attr('href');
            // 找到a标签的子标签img并获取_src
            const pic_src = pic.find('a').children('img').attr('_src');
            // 找到a标签的子标签img并获取alt
            const pic_message = pic.find('a').children('img').attr('alt');
            // 向数组插入数据
            slideListData.push({
                pic_href: pic_href,
                pic_message: pic_message,
                pic_src: pic_src
            });
        });
        // 返回轮播图列表信息
        return slideListData;
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
        fetch(url, {})
            .then(res=>res.text())
            .then(json=>console.log(json));
    }

    testParseHtml() {
        const html = '<ul id="foucsSlideList">\n' +
            '<li><a href="http://www.ziroom."><img src="http://www.zne.png" alt="北京租房" ></a></li>\n' +
            '<li><a href="http://www.ziroom."><img src="http://www.zne.png" alt="北京租房" ></a></li>\n' +
            '</ul>';
        const slideListData = this.parseHtml(html);
        console.info(JSON.stringify(slideListData));
    }

    demoTest() {
        let url = 'http://www.ziroom.com/';
        for (let i = 1; i < 100; i++) {
            url += i
            console.log("请求网络 " + url);
            this.httpNet(url);
            this.requestNet(url);
            this.fetchNet(url);
        }
    }
}

let test = new Test();
test.fetchNet('http://www.baidu.com/');



