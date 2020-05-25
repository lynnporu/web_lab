import { CookieJar } from './classes/CookieJar.js';
import Loader from './classes/Loader.js';
import { User } from './classes/User.js';
import { Playlist } from './classes/Playlist.js';
import { Track } from './classes/Track.js';

let playlists_container = document.getElementById('main-playlists-container');
let tracks_container = document.getElementById('main-tracks-container');
let player_name = document.getElementById('main-player-name');
let player_author = document.getElementById('main-player-author');
let player_duration = document.getElementById('main-player-duration');

let user = User.loadByCookies();
if (!user) console.error("User data was not loaded!");

Playlist.getAll(user)
	.then(
		resolve =>
			playlists_container.innerHTML
				= Playlist.generateHTMLFromArray(resolve),
		reject => console.error('Error when loading playlists.', reject)
	);

Track.getAll(user)
	.then(
		resolve =>
			tracks_container.innerHTML
				= Track.generateHTMLFromArray(resolve),
		reject => console.error('Error when loading tracks.', reject)
	);
