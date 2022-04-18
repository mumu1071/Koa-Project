const cheerio = require('cheerio');
const iconv = require('iconv-lite');

class Test {
    testHtmlParse() {
        const html = '<ul id="foucsSlideList">\n' +
            '<li><a href="http://www.ziroom."><img src="http://www.zne.png" alt="北京租房" ></a></li>\n' +
            '<li><a href="http://www.ziroom."><img src="http://www.zne.png" alt="北京租房" ></a></li>\n' +
            '</ul>';
        // 沿用JQuery风格，定义$
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
                pic_href: pic_href, pic_message: pic_message, pic_src: pic_src
            });
        });
        // 返回轮播图列表信息
        return slideListData;
    }
}


let test = new Test();
test.testHtmlParse();








