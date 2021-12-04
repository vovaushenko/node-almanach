const http = require('http');
const EventEmitter = require('events');

module.exports = class Application {
	constructor() {
		this.emitter = new EventEmitter();
		this.server = this._createServer();
		this.middlewares = [];
	}
	listen(port, callback) {
		this.server.listen(port, callback);
	}

	/**
	 * endpoint: {
	 *      '/users': {
	 *        'GET': handler
	 *     }
	 *  }
	 *
	 */
	addRouter(router) {
		// iterate over endpoints to get paths and methods, and forEach
		// enpoint subscribe to a corresponding event
		Object.keys(router.endpoints).forEach((path) => {
			const endpointMethods = router.endpoints[path];
			Object.keys(endpointMethods).forEach((method) => {
				//* on specified path we add handler that responds to an emitted event
				this.emitter.on(this._getRouteMask(path, method), (req, res) => {
					const handler = endpointMethods[method];

					handler(req, res);
				});
			});
		});
	}

	_createServer() {
		return http.createServer((req, res) => {
			//* respond to POST requests
			let body = '';
			req.on('data', (chunk) => {
				body += chunk;
			});

			req.on('end', () => {
				if (body) {
					req.body = JSON.parse(body);
				}
				//* call applied middlewares
				this.middlewares.forEach((middleware) => middleware(req, res));
				const emitted = this.emitter.emit(
					this._getRouteMask(req.pathname, req.method),
					req,
					res
				);
				if (!emitted) {
					res.end();
				}
			});
		});
	}

	_getRouteMask(path, method) {
		return `[${path}]:[${method}]`;
	}

	use(...appliedMiddlewares) {
		for (const middleware of appliedMiddlewares) {
			this.middlewares.push(middleware);
		}
	}
};
