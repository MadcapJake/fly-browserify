'use strict';

const p = require('path');
const arrify = require('arrify');
const browserify = require('browserify');

module.exports = function () {
	const setError = msg => this.emit('plugin_error', {
		plugin: 'fly-browserify',
		error: msg.replace(this.root, '').replace(': ', ': \n\n  ')
						.replace(' while parsing', '\n\nwhile parsing').concat('\n')
	});

	this.plugin('browserify', {every: 0}, function * (files, opts) {
		opts = opts || {};
		opts.entries = opts.entries && arrify(opts.entries);
		// ensure pathObjects (consistency)
		files = opts.entries ? opts.entries.map(p.parse) : files;
		// dont pass to browserify
		delete opts.entries;

		const b = browserify();

		const bundle = obj => new Promise((res, rej) => {
			b.add(p.format(obj), opts);
			b.bundle((err, buf) => err ? rej(err) : res(buf));
		});

		// @todo: check for source maps?
		for (let file of files) {
			try {
				file.data = yield bundle(file);
			} catch (err) {
				return setError(err.message);
			}

			b.reset();
		}

		// replace `fly._.files`
		this._.files = files;
	});
};
