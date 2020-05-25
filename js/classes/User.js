import { CookieJar } from './CookieJar.js';
import Loader from './Loader.js';

export class User {

	constructor(data) {

		this.changeData(data);

	}

	changeData(newData) {

		Object.keys(newData).map(
			key => this[key] = newData[key])

		this.deleteCookies();
		this.storeInCookies();

	};

	/*Check whether the session is stored in cookies and returns
	* instance of User or `false` otherwise. */
	static loadByCookies() {

		let cookie = CookieJar.grab('session');

		return !cookie
			? false
			: new User(cookie);

	}

	storeInCookies() {
		
		CookieJar.put(
			'session',
			{
				'access_token': this.access_token,
				'relogin_token': this.relogin_token,
				'user': this.user
			},
			{
				'max-age': this.expire
			}
		);

	}

	deleteCookies() {

		CookieJar.destroy('session');

	}

	static async byLogin(login, password) {

		return await Loader.call('post', 'auth/login', {
			"login":  login,
			"password": password
		})
			.then(
				resolve => new User(resolve),
				reject => console.error(reject)
			);

	}

	static async byRegister(name, login, password) {

		return await Loader.call('post', 'auth/register', {
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

		if (!this.relogin_token) return;

		return await Loader.call('get', 'auth/renew', {
			'relogin': this.relogin_token
		})
			.then(
				resolve => this.changeData(resolve),
				reject => console.error(reject)
			);

	}

	/*Reject all access_token and relogin_token's. */
	async terminateSessions() {

		if (!this.access_token) return;

		return await Loader.call('get', 'auth/logout', {
			'token': this.access_token
		})
			.then(
				resolve => this.clear(),
				reject => console.error(reject)
			);

	}

	/*Reject current access_token. */
	async logout() {

		if (!this.access_token) return;

		return await Loader.call('get', 'auth/reject', {
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

		this.deleteCookies();

	}

}