<?php

//still no checks, but who cares whoaaa i feel so good right now

$id = demand('id');

auth();

$playlist = $GLOBALS['e_mongo']->data->playlists->findOne([
	"_id" => new MongoDB\BSON\ObjectId($id)
]);

$tracks_cursor = $GLOBALS['e_mongo']->data->playlists->aggregate([
	[
		'$match' => ["_id" => new MongoDB\BSON\ObjectId($id)]
	],
	[
		'$unwind' => '$tracks'
	],
	[
		'$lookup' => [
			'from' => 'music',
			'localField' => 'tracks',
			'foreignField' => '_id',
			'as' => 'track'
		]
	],
	[
		'$unwind' => '$track'
	],
	[
		'$replaceRoot' => ['newRoot' => '$track']
	]
]);


$tracks = [];

foreach ($tracks_cursor as $doc) {
	$tracks[] = [
		'id'		=> $doc->_id->__toString(),
		'name'		=> $doc->name,
		'author'	=> $doc->author,
		'duration'	=> $doc->duration,
		'file_url'	=> 'http://localhost:8080/' . ($doc->file_url)
	];
}

$playlists_cursor = $GLOBALS['e_mongo']->data->playlists->find(
	$source == 'profile'
		? ['user_id' => $GLOBALS['auth_user_id']]
		: [],
	["limit" => (int)grab('limit', null, 0)]
);

emit([
	'id'		=> $playlist->_id->__toString(),
	'name'		=> $playlist->name,
	'image_url'	=> 'http://localhost:8080/' . ($playlist->photo_url),
	'tracks'	=> $tracks
]);

?>