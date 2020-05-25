import { CookieJar } from './classes/CookieJar.js';
import Loader from './classes/Loader.js';
import { User } from './classes/User.js';

let login_input = document.getElementById('login-login-input');
let password_input = document.getElementById('login-password-input');
let login_button = document.getElementById('login-login-button');
let register_button = document.getElementById('login-register-button');

register_button.addEventListener('click', e => {
	document.location.replace('register.html');
}, false);

let user = User.loadByCookies();
if (user) user.logout();

login_button.addEventListener('click', e => {

	User.byLogin(login_input.value, password_input.value)
		.then(
			resolve => document.location.replace('main.html'),
			reject => console.error('Error with login.', reject)
		);

} , false);