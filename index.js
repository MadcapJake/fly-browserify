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

		for (let file of files) {
			b.add(p.format(file), opts);

			try {
				// check for source maps?
				file.data = yield streamToPromise(b.bundle());
			} catch (err) {
				return setError(err.message);
			}

			b.reset();
		}

		// replace `fly._.files`
		this._.files = files;
	});
};
