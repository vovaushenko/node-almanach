module.exports = class Router {
	constructor() {
		this.endpoints = {};
	}

	request(method = 'GET', path, handler) {
		if (!(path in this.endpoints)) {
			this.endpoints[path] = {};
		}
		// /users [GET, POST, PUT]  /posts [GET, POST, PUT, DELETE]
		const endpoint = this.endpoints[path];

		if (method in endpoint) {
			throw new Error(`${method} @ address ${path} already defined`);
		}

		endpoint[method] = handler;
	}

	get(path, handler) {
		this.request('GET', path, handler);
	}
	post(path, handler) {
		this.request('POST', path, handler);
	}
	put(path, handler) {
		this.request('PUT', path, handler);
	}
	patch(path, handler) {
		this.request('PATCH', path, handler);
	}
	delete(path, handler) {
		this.request('DELETE', path, handler);
	}
};
