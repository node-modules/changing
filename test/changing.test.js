/**!
 * changing - test/changing.test.js
 *
 * Copyright(c) node-modules and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <m@fengmk2.com> (http://fengmk2.com)
 */

'use strict';

/**
 * Module dependencies.
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const changing = require('../');

const fixtures = path.join(__dirname, 'fixtures');

describe('changing.test.js', function () {
  function cleanup() {
    fs.writeFileSync(path.join(fixtures, 'foo.js'), 'bar\n');
    try {
      fs.unlinkSync(path.join(fixtures, '.tmpfile'));
    } catch (_) {
      // ignore error
    }
  }

  beforeEach(cleanup);
  afterEach(cleanup);

  it('should create watch without options', function () {
    var watcher = changing();
    watcher.close();
  });

  it('should watching fixtures/foo.js change', function (done) {
    let watcher = changing({ interval: 500 });
    watcher.add(path.join(fixtures, 'foo.js'));
    watcher.add(path.join(fixtures, 'foo.js'));
    watcher.on('change', function (info) {
      assert.equal(info.event, 'change');
      assert.equal(info.path, path.join(fixtures, 'foo.js'));
      assert(info.stat);
      watcher.close();
      // close again should work
      watcher.close();
      done();
    });

    setTimeout(function () {
      fs.writeFileSync(path.join(fixtures, 'foo.js'), 'bar update\n');
    }, 1000);
  });

  it('should got stat-error when watch filepath not exists', function (done) {
    let watcher = changing({ interval: '100ms' });
    watcher.add(path.join(fixtures, 'foo.js-not-exists'));
    watcher.add(path.join(fixtures, 'foo.js-not-exists'));
    watcher.on('change', function () {
      throw new Error('should not run this');
    });
    watcher.on('stat-error', function (err) {
      assert.equal(err.code, 'ENOENT');
      // and emit once
      setTimeout(function () {
        watcher.close();
        done();
      }, 200);
    });
  });

  it('should watching fixtures/.tmpfile become exists', function (done) {
    let watcher = changing({ interval: 100 });
    watcher.add(path.join(fixtures, '.tmpfile'));
    watcher.on('change', function (info) {
      assert.equal(info.event, 'change');
      assert.equal(info.path, path.join(fixtures, '.tmpfile'));
      assert(info.stat);

      setTimeout(function () {
        // remove it and emit stat-error again
        fs.unlinkSync(path.join(fixtures, '.tmpfile'));
        watcher.on('stat-error', function (err) {
          assert.equal(err.code, 'ENOENT');

          // and emit once
          setTimeout(function () {
            watcher.close();
            done();
          }, 200);
        });
      }, 200);
    });

    setTimeout(function () {
      fs.writeFileSync(path.join(fixtures, '.tmpfile'), 'tmpfile update\n');
    }, 200);
  });
});
