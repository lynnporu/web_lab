import { CookieJar } from './classes/CookieJar.js';
import Loader from './classes/Loader.js';
import { User } from './classes/User.js';
import { Track } from './classes/Track.js';

let tracks_num = document.getElementById('uploads-tracks-num');
let tracks_container = document.getElementById('uploads-tracks-container');

window.user = User.loadByCookies();
if (!window.user) console.error("User data was not loaded.");

Track.getAll(user)
	.then(
		resolve => {
			tracks_container.innerHTML
				= Track.generateUploadHTMLFromArray(resolve);
			tracks_num.innerHTML = resolve.length
		},
		reject => console.error('Error when loading tracks.', reject)
	)

window.deleteTrack = id => {

	Loader.call('delete', 'music', {
		'token' : window.user.access_token,
		'id': id
	})
		.then(
			resolve => document.getElementById('track-' + id).remove(),
			reject => console.error('Error when deleting track.', reject)
		);

};
