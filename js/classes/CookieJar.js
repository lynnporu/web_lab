class CookieJar {

	static put(key, value, options = {}) {

		options = {path: '/', ...options};

		if (options.expires instanceof Date)
			options.expires = options.expires.toUTCString();

		if (value === Object(value))
			value = JSON.stringify(value);

		let update = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;

		for (let parameter in options) {
			update += `; ${parameter}`;
			let paramValue = options[parameter];
			if (paramValue !== true) update += `=${paramValue}`;
		}

		document.cookie = update;

	}

	static grab(key) {

		let cookies = document.cookie.match(
			new RegExp("(?:^|; )" +
				key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
				"=([^;]*)")
		);

		if (!cookies) return undefined;
		else {

			let cookie = decodeURIComponent(cookies[1]);

			return (cookie[0] == '{' || cookie[0] == '[')
				? JSON.parse(cookie)
				: cookie;

		}

	}

	static destroy(key) {

		CookieJar.put(key, "", {"max-age": -1});

	}

}