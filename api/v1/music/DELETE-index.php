<?php

//unsafe script, no checks here

auth();

$id = demand('id');
$playlist_id = grab('playlist', null, null);

checkGrabErrors();

$selector = ['_id' => new MongoDB\BSON\ObjectId($id)];

if(isset($playlist_id)) {
	$GLOBALS['e_mongo']->data->playlists->updateOne(
		$selector,
		['$pull' => [
			'tracks' => new MongoDB\BSON\ObjectId($playlist_id)
		]]
	);
} else {
	$GLOBALS['e_mongo']->data->music->deleteOne($selector);
}

no_content("Track was deleted.");

?>