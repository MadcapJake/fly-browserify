'use strict';

const {format, parse} = require('path');
const browserify = require('browserify');
const arrify = require('arrify');

const NAME = 'fly-browserify';

module.exports = function (fly) {
	const setError = msg => {
		fly.emit('plugin_error', {
			plugin: NAME,
			error: msg.replace(fly.root, '').replace(': ', ': \n\n  ').replace(' while parsing', '\n\nwhile parsing').concat('\n')
		});
		return new Buffer(`console.error('${NAME}: Bundle error! Check CLI output.');`);
	};

	fly.plugin('browserify', {every: 0}, function * (files, opts) {
		opts = opts || {};

		if (opts.entries) {
			files = arrify(opts.entries).map(parse);
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
			b.add(format(obj), opts);
			b.bundle((err, buf) => err ? rej(err) : res(buf));
		});

		// @todo: check for source maps?
		for (const file of files) {
			try {
				file.data = yield bundle(file);
			} catch (err) {
				file.data = setError(err.message);
			}

			b.reset();
		}

		// replace `fly._.files`
		this._.files = files;
	});
};
