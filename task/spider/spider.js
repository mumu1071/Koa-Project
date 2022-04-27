const http = require('http');
const request = require("request");
const fetch = require('node-fetch')
const cheerio = require('cheerio');
const mongoDB = require('../util/mongo-db')
const async = require("async");

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
        request.get(url, {}, function (err, response, body) {
            if(err){
                console.info(err);
            }else {
                console.info(response.body);
            }
        });
    }

    fetchNet(url) {
        fetch(url).then(response => {
            return response.json().then(data => {
                if (response.ok) {
                    return data;
                } else {
                    return Promise.reject({status: response.status, data});
                }
            });
        })
            .then(result => {
                console.log('success:', result)
            })
            .catch(error => {
                console.log('error:', error)
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
        console.info(JSON.stringify(slideListData))
        return slideListData;
    }

    demoTest() {
        let url = 'https://bb9055.com/video/video_list.html?video_type=1&page_index=';
        for (let i = 2; i < 3; i++) {
            url += i
            console.log("请求网络 " + url);

        }
    }
}

let test = new Test();
test.requestNet("https://bb9055.com/video/video_list.html?video_type=1&page_index=2");



