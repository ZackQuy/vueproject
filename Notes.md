## 项目javascript  全程使用 es6 语法

项目代码全程采用 ES6 以及 ES7语法， 通过 polyfill 和 babel 来兼容部分非标准浏览器

### 1. 解构赋值

#### 1.1 提取json

    let jsonData = {
      id: 42,
      status: "OK",
      data: [867, 5309]
    };

    let { id, status, data: number } = jsonData;  //data: number 解构出来取别名类似

#### 1.2 解构赋值与函数

    // 函数内部取值 再也不用 props[0]
    fn = ([x, y, z]) => x
    fn([12, 3, 4])

    // 解构赋值成 数组
    function example() {
      return [1, 2, 3];
    }
    let [a, b, c] = example();

    // 解构赋值成 对象
    function example() {
      return {
        foo: 1,
        bar: 2
      };
    }
    let { foo, bar } = example();


### 2. 字符串方法

    '2'.padStart(2, '0')  // '02' 字符串的补位

    'hello kitty'.startsWith('hello') // true  判断字符串的起手
         endsWith includes

    var name = "Bob", time = "today";
        `Hello ${name}, how are you ${time}?`

    var a = 5;
    var b = 10;
    tag`Hello ${ a + b } world ${ a * b }`;
    // 等同于
    tag(['Hello ', ' world ', ''], 15, 50);


### 3. 数值的方法



#### 3.1 数值的拓展

    // es5 全局挂载的这些方法挂载到了Number上， 便于模块分离
    Number.isNaN()
    Number.parseInt()
    Number.parseFloat()
    Number.isInteger()
    // 极小的一个常量 修正 浮点数的计算偏差
    Number.EPSILON

#### 3.2 Math对象的拓展

    Math.trunc() 用于去除一个数的小数部分，返回整数部分。


### 4. 数组的拓展


    Array.from()
    //用于将两类对象转为真正的数组：类似数组的对象（array-like object）
    //和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）。
    //
    Array.from([1, 2, 3], (x) => x*x)

    // ...spead操作符
    [...new Set([2,3,44,55,66,33,44,55,2,44,33])]

    [4, 3, 2, 1].find(function(e, i, arr){ return e > 2 })
    // 4
    [4, 3, 2, 1].findIndex(function(e, i, arr){ return e > 2 })
    // 0

    ['a', 'b', 'c'].fill(7)
    // [7, 7, 7]


    // keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历
    for (let index of ['a', 'b'].keys()) {
      console.log(index);
    }
    // 0
    // 1

    for (let elem of ['a', 'b'].values()) {
      console.log(elem);
    }
    // 'a'
    // 'b'

    for (let [index, elem] of ['a', 'b'].entries()) {
      console.log(index, elem);
    }
    // 0 "a"
    // 1 "b"

    Array.of(3, 11, 8) // [3,11,8]
    Array.of(3) // [3]

    Array(3) // [, , ,]
    Array(3, 11, 8) // [3, 11, 8]

### 5. 函数的拓展

#### 5.1 函数的默认值 和 解构赋值

    function fetch(url, { method = 'GET' } = {}) {
      console.log(method);
    }
    // 函数的默认值 是 {} 然后结构赋值 的 默认值 会生效 不会报错  这就是 {} 的用处

    fetch('http://example.com')

    // 解构赋值与spead 操作符
    let [a, ...rest] = [3, 22, 44]

    let arss = new Map([[1, 33], [2, 32], [3, 44]])
    let arr = [...arss.keys()]
    // (3) [1, 2, 3]


### 6. 对象的拓展


#### 6.1  属性的简写和方法的简写

    var o = {
      method() {
        return "Hello!";
      }
    };

    // 等同于

    var o = {
      method: function() {
        return "Hello!";
      }
    };

#### 6.2  模块的输出

    module.exports = { getItem, setItem, clear };
    // 等同于
    module.exports = {
      getItem: getItem,
      setItem: setItem,
      clear: clear
    };


#### 6.3  字面量定义对象

    let propKey = 'foo';

    let obj = {
      [propKey]: true,
      ['a' + 'bc']: 123
    };

#### 6.4  对象的合并

`Object.assign`方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。


    var target = { a: 1, b: 1 };

    var source1 = { b: 2, c: 2 };
    var source2 = { c: 3 };

    Object.assign(target, source1, source2);
    target // {a:1, b:2, c:3}


`only` 居然有这种神奇的 only 包, 它解决的问题是 通过给定的 keys 的数组  生成一个新的对象， 就一个函数， 便是一个 npm 包， 简直了


    module.exports = function(obj, keys){
      obj = obj || {};
      if ('string' == typeof keys) keys = keys.split(/ +/);
      return keys.reduce(function(ret, key){
        if (null == obj[key]) return ret;
        ret[key] = obj[key];
        return ret;
      }, {});
    };    

#### 6.5  Null 传导运算符

    const firstName = message?.body?.user?.firstName || 'default';
    // 转化为
    const firstName = (message
      && message.body
      && message.body.user
      && message.body.user.firstName) || 'default';


    // 如果 a 是 null 或 undefined, 返回 undefined
    // 否则返回 a.b.c().d
    a?.b.c().d

    // 如果 a 是 null 或 undefined，下面的语句不产生任何效果
    // 否则执行 a.b = 42
    a?.b = 42

    // 如果 a 是 null 或 undefined，下面的语句不产生任何效果
    delete a?.b


### 7.  Set & Map


#### 7.1  Set

    // 去除数组的重复成员
    [...new Set(array)]

    `Set.prototype.size`：返回Set实例的成员总数。

    `add(value)`：添加某个值，返回Set结构本身。
    `delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
    `has(value)`：返回一个布尔值，表示该值是否为Set的成员。
    `clear()`：清除所有成员，没有返回值。

    <!-- 由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致 -->
    let set = new Set(['red', 'green', 'blue']);
    for (let item of set.keys()) {
      console.log(item);
    }

#### 7.2  Map

Object 结构提供了“字符串—值”的对应，Map结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

    const m = new Map();
    const o = {p: 'Hello World'};

    m.set(o, 'content')
    m.get(o) // "content"

    m.has(o) // true
    m.delete(o) // true
    m.has(o) // false

    const myMap = new Map()
      .set(true, 7)
      .set({foo: 3}, ['abc']);
    [...myMap]
    // [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]


### 8.  异步 Promise


    <!-- 创建promise对象 -->
    var promise = new Promise(function(resolve, reject) {
      resolve('ok');  
      throw new Error('test');
    });

    <!-- 成功和失败的回调 -->
    promise
      <!-- success -->
      .then(function(value) { console.log(value) })
      <!-- error -->
      .catch(function(error) { console.log(error) });



### 9. Iterator 迭代器

### 10. Generator

  1. function关键字与函数名之间有一个星号；
  2. 函数体内部使用yield表达式，定义不同的内部状态
  3. Generator的 this 指向该对象

    function* helloWorldGenerator() {
      yield 'hello';
      yield 'world';
      return 'ending';
    }

    var hw = helloWorldGenerator();

    <!-- hw.return('foo') // { value: "foo", done: true } -->


    hw.next()
    // { value: 'hello', done: false }
    hw.next()
    // { value: 'world', done: false }
    hw.next()
    // { value: 'ending', done: true }
    hw.next()
    // { value: undefined, done: true }

### 11. async & await


有一个 Generator 函数，依次读取两个文件, 需要手动调用 next() Generator 函数的执行必须靠执行器，所以才有了co模块

    var fs = require('fs');
    var readFile = function (fileName) {
      return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function(error, data) {
          if (error) reject(error);
          resolve(data);
        });
      });
    };

    var gen = function* () {
      var f1 = yield readFile('/etc/fstab');
      var f2 = yield readFile('/etc/shells');
      console.log(f1.toString());
      console.log(f2.toString());
    };





改造成  async 和 await 语法

    var asyncReadFile = async function () {
      var f1 = await readFile('/etc/fstab');
      var f2 = await readFile('/etc/shells');
      console.log(f1.toString());
      console.log(f2.toString());
    };


    <!-- 函数前面的async关键字，表明该函数内部有异步操作。调用该函数时，会立即返回一个Promise对象。 -->
    async function getStockPriceByName(name) {
      var symbol = await getStockSymbol(name);
      var stockPrice = await getStockPrice(symbol);
      return stockPrice;
    }

    getStockPriceByName('goog').then(function (result) {
      console.log(result);
    });


### 11. 历史包袱


callback => Promise => Generator => async / await

LTS 三个月节点之后做现实的替换 等待官方修复一些问题
V8 6.x  覆盖 93% 的 ecmascript 代码






'GeoQ灰色底图': 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
他们的数据库显示信息不全, 目前这里是能看到地图瓦片   http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/4/3/3

前端通过leaflet加载瓦片  http://wandergis.com/leaflet-echarts3/examples/index.html
