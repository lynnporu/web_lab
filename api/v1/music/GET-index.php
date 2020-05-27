<?php

//unsafe script, no checks here

$source = grab('source', null, 'all');

auth();

$playlists_cursor = $GLOBALS['e_mongo']->data->music->find(
	$source == 'profile'
		? ['user_id' => $GLOBALS['auth_user_id']]
		: []
);

foreach ($playlists_cursor as $doc) {
	$docs[] = [
		'id'		=> $doc->_id->__toString(),
		'name'		=> $doc->name,
		'author'	=> $doc->author,
		'duration'	=> $doc->duration,
		'file_url'	=> $doc->file_url
	];
}

emit($docs);

?>