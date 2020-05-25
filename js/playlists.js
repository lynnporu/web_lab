import { CookieJar } from './classes/CookieJar.js';
import Loader from './classes/Loader.js';
import { User } from './classes/User.js';
import { Playlist } from './classes/Playlist.js';

let playlists_container_my = document.getElementById('playlists-container-my');
let playlists_container_all = document.getElementById('playlists-container-all');
let playlists_add_button = document.getElementById('playlists-add-button');

let user = User.loadByCookies();
if (!user) console.error("User data was not loaded!");

Playlist.getAll(user)
	.then(
		resolve =>
			playlists_container_my.innerHTML
				= Playlist.generateHTMLFromArray(resolve),
		reject => console.error('Error when loading playlists.', reject)
	)

Playlist.getAll(user)
	.then(
		resolve =>
			playlists_container_all.innerHTML
				= Playlist.generateHTMLFromArray(resolve),
		reject => console.error('Error when loading playlists.', reject)
	);

playlists_add_button.addEventListener('click', e => {
	document.location.replace('playlist_create.html')
}, false);
