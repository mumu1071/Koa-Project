const readFile = require('fs-readfile-promise');

/**
 * 异步操作方式（https://blog.csdn.net/weixin_40693643/article/details/102473022）
 *
 *
 */


let test_异步 = () => {

  //回调，缺点是：多层嵌套
  //Promise 缺点：一堆 then，原来的语义变得很不清楚
  readFile('fileA')
    .then(function(data) {
      console.log(data.toString());
    })
    .then(function() {
      return readFile('fileB');
    })
    .then(function(data) {
      console.log(data.toString());
    })
    .catch(function(err) {
      console.log(err);
    });

  let asyncReadFile = async function() {
    const f1 = await readFile('/etc/fstab');
    const f2 = await readFile('/etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
  };
};


test_异步();

/**
 *  为何说nodejs是单线程 ？（https://blog.csdn.net/u010365819/article/details/81567948）
 *    1、nodejs 架构，顶层是node层，底层是C库+V8，js执行在node层，
 *      所以是说，node层，单线程，底层有线程池(默认4)，处理异步任务(非cpu计算，读取数据库，网络等)
 *    2、基于事件驱动、非阻塞I/O模型，单线程接受消息+CPU计算等
 *      异步操作还是，扔到 底层线程池中处理
 *  为何说，nodejs不适合cpu密集型任务？
 *    1、NodeJs 执行是单线程的，CPU密集会阻塞后续代码，且无法充分利用多核CPU。
 *    2、而异步I/O是多线程，在工作线程执行，不会阻塞执行线程
 *    3、通过 child_process 等方式，启用多进程或多线程来处理 CPU 密集型的任务，但没啥优势
 *
 */


/**
 * 基于事件驱动、非阻塞I/O模型
 * 1、如何利用多核CPU：
 *    child_process.fork 开启多个进程，多进程 + 单线程 模式
 * 2、进程守护：pm2 和 forever 底层也是 child_process 模块和 cluster 模块 实现
 *
 */


/**
 * 基于事件驱动、非阻塞I/O模型 (https://zhuanlan.zhihu.com/p/74879045)
 * 1、Client 请求到达 node api，该请求被添加到Event Queue（事件队列）。这是因为Node.js 无法同时处理多个请求。
 * 2、Event Loop（事件循环） 始终检查 Event Queue 中是否有待处理事件，如果有就从 Event Queue 中从前到后依次取出，然后提供服务。
 * 3、Event Loop 是单线程非阻塞I/O，它会把请求发送给 C++ Thread Pool(线程池)去处理，底层是基于C++ Libuv 异步I/O模型结构可以支持高并发。
 * 4、现在 C++ Thread Pool有大量的请求，如数据库请求，文件请求等。
 * 5、任何线程完成任务时，Callback（回调函数）就会被触发，并将响应发送给 Event Loop。
 * 6、最终 Event Loop 会将请求返回给 Client。
 *
 */






