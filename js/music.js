import { CookieJar } from './classes/CookieJar.js';
import Loader from './classes/Loader.js';
import { User } from './classes/User.js';
import { Track } from './classes/Track.js';

let tracks_num = document.getElementById('music-tracks-num');
let tracks_container = document.getElementById('music-tracks-container');
let upload_button = document.getElementById('music-upload-button');
let uploads_button = document.getElementById('music-uploads-button');

let user = User.loadByCookies();
if (!user) console.error("User data was not loaded!");

Track.getAll(user)
	.then(
		resolve => {
			tracks_container.innerHTML
				= Track.generateHTMLFromArray(resolve);
			tracks_num.innerHTML = resolve.length
		},
		reject => console.error('Error when loading tracks.', reject)
	)

upload_button.addEventListener('click', e => {
	document.location.replace('upload.html')
}, false);

uploads_button.addEventListener('click', e => {
	document.location.replace('uploads.html')
}, false);