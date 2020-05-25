import Loader from './Loader.js';

export class Playlist {

	static async getAll(user) {

		return await Loader.call('get', 'playlist', {
			'token': user.access_token
		});

	}

	static generateHTML(photo_url, name){
		return `
			<div class="playlist" onclick="openPlaylist(this)">
				<img
					src="${photo_url}"
					alt="Обкладинка плейлисту ${name}">
				<h3>${name}</h3>
			</div>
		`;
	}

	static generateHTMLFromArray(array){

		let html = '';
		for (let playlist of array)
			html += Playlist.generateHTML(
				playlist.photo_url, playlist.name);
		return html;

	}

}