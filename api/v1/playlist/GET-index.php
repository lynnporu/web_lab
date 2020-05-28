<?php

//still no checks, but who cares whoaaa i feel so good right now

$source = grab('source', null, 'all');

auth();

$playlists_cursor = $GLOBALS['e_mongo']->data->playlists->find(
	$source == 'profile'
		? ['user_id' => $GLOBALS['auth_user_id']]
		: [],
	["limit" => grab('limit', null, 0) * 1]
);


$docs = [];

foreach ($playlists_cursor as $doc) {
	$docs[] = [
		'id'		=> $doc->_id->__toString(),
		'name'		=> $doc->name,
		'image_url'	=> 'http://localhost:8080/' . ($doc->photo_url)
	];
}

emit($docs);

?>