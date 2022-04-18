/**
 * 注意js 和 ts区别
 * https://www.zhihu.com/question/334938460/answer/748952816
 * 关键点：
 * TypeScript是ECMAScript 2015的语法超集，是JavaScript的语法糖。
 * JavaScript程序可以直接移植到TypeScript，
 * TypeScript需要编译（语法转换）生成JavaScript才能被浏览器执行
 */

//以下 ES6 规范
/**
 * 类的数据类型就是函数，类本身就是指向构造函数
 * 只有静态方法，没有静态变量
 * 静态方法 实例不能调用
 * ES7 有提案 定义 静态属性和实例属性
 * ES6 实例属性，只能在构造器中
 * 没有私有属性
 */
class Parent {

  constructor(name, age) {
    //ES6 实例属性
    this.name = name;
    this.age = age;
  }


  static classMethod() {
    console.log('测试我们');
  }

  toString() {
    return this.name + this.age;
  }
}

class Child extends Parent {

  constructor(name, age, sex) {
    super(name, age);
    this.sex = sex;
  }

}


let test_类对象 = () => {
  let child = new Child('张三', 20, '女');
  child.sex = 'bb';
  Parent.classMethod();
  child.score = 22;

  console.log(child.score);
  //Object 对象是基类

};

test_类对象();
