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

		if (opts.entries) {
			files = arrify(opts.entries).map(p.parse);
			delete opts.entries;
		}

		// init bundler
		const b = browserify();

		// apply transforms
		for (const t of opts.transform || []) {
			b.transform.apply(b, arrify(t));
		}

		delete opts.transform;

		const bundle = obj => new Promise((res, rej) => {
			b.add(p.format(obj), opts);
			b.bundle((err, buf) => err ? rej(err) : res(buf));
		});

		// @todo: check for source maps?
		for (const file of files) {
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
