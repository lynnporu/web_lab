<?php

//unsafe script, no checks here

auth();

$name = demand('name');
checkGrabErrors();

$ext = [
	'image/jpeg' => 'jpg',
	'image/gif' => 'gif',
	'image/png' => 'png'
][$_FILES['photo']['type'] ?? 'image/jpeg'];

$photoname = 'imgs/' . uniqid() . '.' . $ext;

move_uploaded_file($_FILES['photo']['tmp_name'], $photoname);

$GLOBALS['e_mongo']->data->playlists->insertOne([
	'user_id' => $GLOBALS['auth_user_id'],
	'photo_url' => $photoname,
	'name' => $name
]);

no_content("New playlist was created.");

?>