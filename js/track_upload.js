import { CookieJar } from './classes/CookieJar.js';
import Loader from './classes/Loader.js';
import { User } from './classes/User.js';

let done_button = document.getElementById('upload-track-done-button');
let author_input = document.getElementById('upload-track-author-input');
let name_input = document.getElementById('upload-track-name-input');
let file_input = document.getElementById('upload-track-file-input');
//User.byLogin('me', '123');

let user = User.loadByCookies();
if (!user) console.error("User data was not loaded.");

file_input.addEventListener('change', e => {
	done_button.classList.toggle('disabled', false);
});

done_button.addEventListener('click', e => {

	let form = new FormData();
	form.append("file", file_input.files[0]);

	Loader.call('post', 'music', {
		'token': user.access_token,
		'name': name_input.value,
		'author': author_input.value
	}, form)
		.then(
			resolve => document.location.replace('music.html'),
			reject => console.error(reject)
		);

});
