import { CookieJar } from './classes/CookieJar.js';
import Loader from './classes/Loader.js';
import { User } from './classes/User.js';

let input_button = document.getElementById('create-playlist-input-button');
let image_button = document.getElementById('create-playlist-image-button');
let done_button = document.getElementById('create-playlist-done-button');
let name_input = document.getElementById('create-playlist-name-input');

let user = User.loadByCookies();
if (!user) console.error("User data was not loaded.");

input_button.addEventListener('change', e => {

	let objurl = window.URL.createObjectURL(e.target.files[0]);
	image_button.style.backgroundImage = `url(${objurl})`;
	image_button.classList.toggle('loaded-file', true);

}, false);

done_button.addEventListener('click', e => {

	let form = new FormData();
	form.append("photo", input_button.files[0]);

	Loader.call('post', 'playlist', {
		'token': user.access_token,
		'name': name_input.value
	}, form)
		.then(
			resolve => document.location.replace('playlists.html'),
			reject => console.error(reject)
		)

});
