import Loader from './Loader.js';

export class Track {

	static async getAll(user) {

		return await Loader.call('get', 'music', {
			'token': user.access_token
		});

	}

	static generateHTML(id, author, name, duration){
		let id_str = id['$oid'];
		const min_str = (duration < (60*10) ? '0' : '') + ~~(duration/60);
		const sec = duration % 60;
		const sec_str = (sec < 10 ? '0' : '') + sec;
		return `
			<div
				class="audio-box no-playing h-row space-between"
				id="track-${id_str}">
				<div class="h-row center-aligning">
					<button class="opaque play toggle-icon">
						<i class="fas fa-play"></i>
						<i class="fas fa-pause"></i>
					</button>
					<div class="info">
						<b>${name}</b>
						<span>${author}</span>
					</div>
				</div>
				<div class="h-row center-aligning">
					<span class="duration">${min_str}:${sec_str}</span>
					<button class="opaque">
						<i class="fas fa-ellipsis-h"></i>
					</button>
				</div>
			</div>
		`;
	}

	static generateUploadHTML(id, author, name, duration){
		let id_str = id['$oid'];
		const min_str = (duration < (60*10) ? '0' : '') + ~~(duration/60);
		const sec = duration % 60;
		const sec_str = (sec < 10 ? '0' : '') + sec;
		return `
			<div
				class="audio-box h-row space-between no-playing"
				id="track-${id_str}">
				<div class="h-row center-aligning">
					<button class="opaque play toggle-icon">
						<i class="fas fa-play"></i>
						<i class="fas fa-pause"></i>
					</button>
					<div class="info">
						<b>${name}</b>
						<span>${author}</span>
					</div>
				</div>
				<div class="h-row center-aligning">
					<span class="duration">${min_str}:${sec_str}</span>
					<button class="opaque" onclick="window.deleteTrack('${id_str}')">
						<i class="fas fa-times"></i>
					</button>
				</div>
			</div>
		`;

	}

	static generateHTMLFromArray(array){

		let html = '';
		for (let track of array)
			html += Track.generateHTML(
				track._id, track.author, track.name, track.duration);
		return html;

	}

	static generateUploadHTMLFromArray(array){

		let html = '';
		for (let track of array)
			html += Track.generateUploadHTML(
				track._id, track.author, track.name, track.duration);
		return html;

	}

}