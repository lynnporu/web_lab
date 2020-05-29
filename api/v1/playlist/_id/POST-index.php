<?php

//unsafe script, no checks here

auth();

$id = demand('id');
$track_id = grab('track', null, null);

checkGrabErrors();

$selector = ['_id' => new MongoDB\BSON\ObjectId($id)];

	$GLOBALS['e_mongo']->data->playlists->updateOne(
		$selector,
		['$push' => [
			'tracks' => new MongoDB\BSON\ObjectId($track_id)
		]]
	);

no_content("Track was deleted.");

?>