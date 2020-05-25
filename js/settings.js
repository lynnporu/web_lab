import { CookieJar } from './classes/CookieJar.js';
import Loader from './classes/Loader.js';
import { User } from './classes/User.js';

let name_input = document.getElementById('settings-name-input');
let login_input = document.getElementById('settings-login-input');

let user = User.loadByCookies();
if (!user) console.error("User data was not loaded!");

name_input.value = user.user.name;
login_input.value = user.user.login;
