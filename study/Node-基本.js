/**
 * JavaScript 和 Nodejs
 * 1、JavaScript：
 *  ECMAScript(语言基础，如：语法、数据类型结构以及一些内置对象)
 *  DOM（一些操作页面元素的方法）
 *  BOM（一些操作浏览器的方法）
 * 2、node
 *  ECMAScript(语言基础，如：语法、数据类型结构以及一些内置对象)
 *  os(操作系统)+file(文件系统)+net(网络系统)+database(数据库)
 */
/**
 * ES6:let、箭头函数、解构、类、Maps、co yield
 * ES7:没啥
 * ES8: async await
 */
/**
 * 基本语法
 * https://zh.javascript.info/
 */

//单行注释

let test_基本数据类型 = () => {

  // 6种原始类型：String，Number，Boolean，undefined，Null(不是object)


  //数字 所有数字都是浮点数，没有整数


  console.log('测试');

  //对象 let temp = {}


};

let test_赋值 = () => {
  //let const
  //解构
  let [a, b] = ['hello', 'JavaScript', 'ES6'];
  let person = {
    name: '小明',
    passport: 'G-12345678',
    address: {
      city: 'Beijing',
      street: 'No.1 Road'
    }
  };
  //嵌套解构
  let { name: nameA, address: { city, street } } = person;
  //默认值
  let { name, single = true } = person;
  console.log(nameA);

};

let test_数据结构 = () => {
  //数组

  //Map
  let map = new Map();
  map.set('Adam', 67);
  map.get('Adam'); // 88
  //Set
  let set = new Set([1, 2, 3, 3, '3']);

  //循环
  for (item of map) {

  }
  map.forEach(item => {

  });


};

let test_函数 = (a, b = 1, ...rest) => {
// 定义函数 function test(){ }
// 1、参数关键字 arguments，表示所有参数 2、(a, b, ...rest)
  //参数默认值
  console.log(b);
};

let test_模块 = () => {

};


test_函数(2, '233');





