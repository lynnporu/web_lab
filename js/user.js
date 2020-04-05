class User {

	constructor(data) {
		this.changeData(data);
	}

	changeData(newData) {

		Object.keys(newData).map(
			key => this[key] = newData[key])

	};

	static async byLogin(login, password) {

		return await loader.call('post', 'auth/login', {
			"login":  login,
			"password": password
		})
			.then(
				resolve => new User(resolve),
				reject => console.error(reject)
			);

	}

	static async byRegister(name, login, password) {

		return await loader.call('post', 'auth/register', {
			"name": name,
			"login": login,
			"password": password
		})
			.then(
				resolve => new User(resolve),
				reject => console.error(reject)
			);

	}

	/*Renew current access_token. */
	async renewAccess() {

		return await loader.call('get', 'auth/renew', {
			'relogin': this.relogin_token
		})
			.then(
				resolve => this.changeData(resolve),
				reject => console.error(reject)
			);

	}

	/*Reject all access_token and relogin_token's. */
	async terminateSessions() {

		return await loader.call('get', 'auth/logout', {
			'token': this.access_token
		})
			.then(
				resolve => this.clear(),
				reject => console.error(reject)
			);

	}

	/*Reject current access_token. */
	async logout() {

		return await loader.call('get', 'auth/reject', {
			'token': this.access_token
		})
			.then(
				resolve => this.clear(),
				reject => console.error(reject)
			);

	}

	/*Clears all data and cookies. */
	clear() {

		delete this.relogin_token;
		delete this.access_token;
		delete this.user;
		delete this.expire;

	}

}