class Loader {

	constructor(server_uri) {

		this.server_uri = server_uri;

	}

	call(method, url, query_params, form=null) {

		return new Promise((resolve, reject) => {

			let request = new XMLHttpRequest();

			request.open(
				method.toUpperCase(),
				this.server_uri + url + (query_params ? '?' : '') +
				Object.keys(query_params).map(
					key => `${key}=${query_params[key]}`).join('&'),
				true);

			request.onreadystatechange = event => {

				/*Server will always return
				  {status: 'ok', response: ...}
				  or
				  {status: 'fail', errno: ..., response: ...} */
				if (request.readyState == 4) {
					let result = JSON.parse(request.response);
					if (result.status == 'ok') resolve(result.response);
					else reject(result.response);
				}

			}

			if (form) request.send(form);
			else request.send();

		});

	}

}

export default new Loader('http://localhost:8080/api/v1/');
