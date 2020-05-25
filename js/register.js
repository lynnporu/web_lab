import { CookieJar } from './classes/CookieJar.js';
import Loader from './classes/Loader.js';
import { User } from './classes/User.js';

let name_input = document.getElementById('register-name-input');
let login_input = document.getElementById('register-login-input');
let password_input = document.getElementById('register-password-input');
let end_button = document.getElementById('register-end-button');
let login_button = document.getElementById('register-login-button');

let user = User.loadByCookies();
user.logout();

console.info('Wait for register.');

end_button.addEventListener('click', e => {

	User.byRegister(
		name_input.value, login_input.value, password_input.value)
		.then(
			resolve => document.location.replace('main.html'),
			reject => console.error('Error with registering.', reject)
		);

}, false);