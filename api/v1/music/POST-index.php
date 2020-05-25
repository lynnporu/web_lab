<?php

//unsafe script, no checks here

auth();

$name = demand('name');
$author = demand('author');
checkGrabErrors();

$ext = [
	'audio/mpeg' => 'mp3',
	'application/ogg' => 'ogg',
	'audio/x-wav' => 'wav'
][$_FILES['photo']['type'] ?? 'audio/mpeg'];

$audioname = 'audio/' . uniqid() . '.' . $ext;

move_uploaded_file($_FILES['file']['tmp_name'], $audioname);

$GLOBALS['e_mongo']->data->music->insertOne([
	'user_id' => $GLOBALS['auth_user_id'],
	'file_url' => $audioname,
	'name' => $name,
	'author' => $author,
	'duration' => rand(120, 300)
]);

no_content("New song was created.");

?>