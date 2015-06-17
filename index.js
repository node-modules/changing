/**!
 * changing - index.js
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

const fs = require('fs');
const util = require('util');
const ms = require('humanize-ms');
const EventEmitter = require('events').EventEmitter;

module.exports = Watcher;

function Watcher(options) {
  if (!(this instanceof Watcher)) {
    return new Watcher(options);
  }
  EventEmitter.call(this);

  this.options = options || {};
  this.options.interval = ms(this.options.interval || '10s');

  // pathname: info
  this._paths = {};
  this._timer = setInterval(this._check.bind(this), this.options.interval);
}

util.inherits(Watcher, EventEmitter);

const proto = Watcher.prototype;

// on 'change' event
// on 'stat-error' event

proto.add = function (fullpath) {
  if (!this._paths[fullpath]) {
    this._paths[fullpath] = {
      event: null,
      path: fullpath,
      stat: null,
      errorMessage: null
    };
    this._checkPath(fullpath);
  }
  return this;
};

proto.close = function () {
  if (this._timer) {
    clearInterval(this._timer);
    this._timer = null;
  }
};

proto._check = function () {
  for (let fullpath in this._paths) {
    this._checkPath(fullpath);
  }
};

proto._checkPath = function (fullpath) {
  let info = this._paths[fullpath];
  let that = this;
  fs.lstat(fullpath, function (err, stat) {
    if (err) {
      if (info.errorMessage === err.message) {
        // ignore this error
        return;
      }
      info.errorMessage = err.message;
      return that.emit('stat-error', err);
    }

    if (info.errorMessage) {
      // error gone, need to emit change
      info.errorMessage = null;
      info.stat = stat;
      info.event = 'change';
      that.emit('change', info);
      return;
    }

    if (!info.stat) {
      info.stat = stat;
      return;
    }
    if (info.stat.mtime.getTime() !== stat.mtime.getTime()) {
      info.stat = stat;
      info.event = 'change';
      that.emit('change', info);
    }
  });
};
