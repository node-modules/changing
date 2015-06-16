changing
=======

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Gittip][gittip-image]][gittip-url]
[![David deps][david-image]][david-url]
[![iojs version][iojs-image]][iojs-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/changing.svg?style=flat-square
[npm-url]: https://npmjs.org/package/changing
[travis-image]: https://img.shields.io/travis/node-modules/changing.svg?style=flat-square
[travis-url]: https://travis-ci.org/node-modules/changing
[coveralls-image]: https://img.shields.io/coveralls/node-modules/changing.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/node-modules/changing?branch=master
[gittip-image]: https://img.shields.io/gittip/fengmk2.svg?style=flat-square
[gittip-url]: https://www.gittip.com/fengmk2/
[david-image]: https://img.shields.io/david/node-modules/changing.svg?style=flat-square
[david-url]: https://david-dm.org/node-modules/changing
[iojs-image]: https://img.shields.io/badge/io.js-%3E=_1.0-yellow.svg?style=flat-square
[iojs-url]: http://iojs.org/
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/changing.svg?style=flat-square
[download-url]: https://npmjs.org/package/changing

Watching `file`, `dir` or `link` changing, using interval timer.

## Installation

```bash
$ npm install changing --save
```

## Usage

```js
var changing = require('changing');

var watcher = changing({
  interval: '10s'
});

watcher.add(path1);
watcher.add(path2);

watcher.on('change', function (info) {
  console.log(info);
  // { event: 'change',
  // path: '/Users/mk2/git/changing/test/fixtures/foo.js',
  // stat:
  //  { dev: 16777220,
  //    mode: 33188,
  //    nlink: 1,
  //    uid: 501,
  //    gid: 20,
  //    rdev: 0,
  //    blksize: 4096,
  //    ino: 72656587,
  //    size: 11,
  //    blocks: 8,
  //    atime: Wed Jun 17 2015 00:08:11 GMT+0800 (CST),
  //    mtime: Wed Jun 17 2015 00:08:38 GMT+0800 (CST),
  //    ctime: Wed Jun 17 2015 00:08:38 GMT+0800 (CST),
  //    birthtime: Tue Jun 16 2015 23:19:13 GMT+0800 (CST) } }
});
```

## License

[MIT](LICENSE)
